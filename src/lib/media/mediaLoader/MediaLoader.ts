export interface MediaItem {
  container: string
  url: string
  type: 'image' | 'video' | 'audio'
  progressColor?: string
  className?: string
  style?: Partial<CSSStyleDeclaration>
}

export interface Callbacks {
  onStart?: (url: string) => void
  onProgress?: (url: string, progress: number) => void
  onComplete?: (url: string) => void
  onError?: (url: string, error: string) => void
}

export interface LogEntry {
  url: string
  error: string
}

export class MediaLoader {
  private logs: LogEntry[] = []
  private activeLoads = new Set<string>()
  private readonly opacity: number
  private readonly maxConcurrentLoads: number // Максимальное количество одновременно загружаемых файлов
  private cache: Map<
    string,
    HTMLImageElement | HTMLVideoElement | HTMLAudioElement
  > = new Map() // Кэш медиа

  constructor(opacity: number = 0.5, maxConcurrentLoads: number = 5) {
    this.opacity = Math.max(0, Math.min(opacity, 1))
    this.maxConcurrentLoads = maxConcurrentLoads
  }

  loadMedia(mediaList: MediaItem[], callbacks: Callbacks): Promise<void[]> {
    const results: Promise<string>[] = []
    const loadingPromises = mediaList.map((media) =>
      this.loadSingleMedia(media, callbacks),
    )

    // Управляем параллельной загрузкой
    const processBatch = async () => {
      while (loadingPromises.length > 0) {
        const batch = loadingPromises.splice(0, this.maxConcurrentLoads)
        results.push(...(await Promise.allSettled(batch)))
      }
    }

    return processBatch().then(() => this.handleResults(results))
  }

  private loadSingleMedia(
    media: MediaItem,
    callbacks: Callbacks,
  ): Promise<string> {
    const { container, url, type, progressColor, className, style } = media

    return new Promise((resolve, reject) => {
      if (!url) {
        const errorMessage = `URL для медиа типа "${type}" в контейнере "${container}" отсутствует.`
        callbacks.onError?.(url, errorMessage)
        return reject(errorMessage)
      }

      // Проверка кэша
      if (this.cache.has(url)) {
        const cachedElement = this.cache.get(url)!
        this.handleMediaLoad(
          url,
          type,
          null,
          callbacks,
          resolve,
          reject,
          className,
          style,
          container,
          cachedElement,
        )
        return
      }

      this.activeLoads.add(url)
      callbacks.onStart?.(url)
      const overlay = this.createOverlay(container)
      const progressBar = this.createProgressIndicator(
        overlay,
        progressColor || 'green',
      )

      this.trackProgress(url, (percent) => {
        callbacks.onProgress?.(url, percent)
        progressBar.style.width = `${percent}%`
      })
        .then(() =>
          this.handleMediaLoad(
            url,
            type,
            overlay,
            callbacks,
            resolve,
            reject,
            className,
            style,
            container,
          ),
        )
        .catch((err) => this.handleError(overlay, url, err, callbacks, reject))
    })
  }

  private handleMediaLoad(
    url: string,
    type: 'image' | 'video' | 'audio',
    overlay: HTMLDivElement | null,
    callbacks: Callbacks,
    resolve: (value: string) => void,
    reject: (reason?: any) => void,
    className?: string,
    style?: Partial<CSSStyleDeclaration>,
    container: string,
    element?: HTMLImageElement | HTMLVideoElement | HTMLAudioElement,
  ) {
    if (!element) {
      element = this.createMediaElement(type, url, className, style)
    }

    if (overlay) {
      const containerElement = document.getElementById(container)
      if (containerElement) {
        containerElement.appendChild(element)
      } else {
        console.error(`Контейнер с id "${container}" не найден.`)
        return reject(`Контейнер с id "${container}" не найден.`)
      }
    }

    element.onload = () => {
      if (overlay) this.completeLoad(url, overlay, callbacks, resolve)
      this.cache.set(url, element) // Кэшируем загруженный элемент
    }

    element.onloadeddata = () => {
      if (overlay) this.completeLoad(url, overlay, callbacks, resolve)
      this.cache.set(url, element) // Кэшируем загруженный элемент
    }
  }

  private completeLoad(
    url: string,
    overlay: HTMLDivElement,
    callbacks: Callbacks,
    resolve: (value: string) => void,
  ) {
    this.removeOverlay(overlay)
    this.activeLoads.delete(url)
    callbacks.onComplete?.(url)
    resolve(url)
  }

  private handleError(
    overlay: HTMLDivElement,
    url: string,
    error: string,
    callbacks: Callbacks,
    reject: (reason?: any) => void,
  ) {
    this.removeOverlay(overlay)
    this.activeLoads.delete(url)
    callbacks.onError?.(url, error)
    reject(error)
  }

  private handleResults(results: PromiseSettledResult<any>[]) {
    results.forEach((result) => {
      if (result.status === 'rejected') {
        console.error(`Ошибка загрузки: ${result.reason}`)
      }
    })
  }

  private trackProgress(
    url: string,
    onProgress: (percent: number) => void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'

      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          onProgress((event.loaded / event.total) * 100)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          onProgress(100)
          resolve()
        } else {
          this.logError(url, xhr.status, xhr.statusText)
          reject(
            `Ошибка загрузки ${url}: Статус ${xhr.status} - ${xhr.statusText}`,
          )
        }
      }

      xhr.onerror = () => {
        this.logError(url, xhr.status, xhr.statusText)
        reject(
          `Ошибка сети при загрузке ${url}: ${xhr.status} - ${xhr.statusText}`,
        )
      }

      xhr.send()
    })
  }

  private logError(url: string, status: number, statusText: string) {
    const errorMessage = `Ошибка загрузки ${url}: Статус ${status} - ${statusText}`
    this.logs.push({ url, error: errorMessage })
  }

  private createOverlay(container: string): HTMLDivElement {
    const overlay = this.createElement('div', {
      position: 'absolute',
      backgroundColor: `rgba(0, 0, 0, ${this.opacity})`,
      width: '100%',
      height: '100%',
      zIndex: '10',
    })

    this.appendToContainer(container, overlay)
    return overlay
  }

  private createProgressIndicator(
    overlay: HTMLDivElement,
    color: string,
  ): HTMLDivElement {
    const indicator = this.createElement('div', {
      position: 'absolute',
      width: '80%',
      height: '6px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '20px',
      top: '50%',
      left: '10%',
    })

    const progressBar = this.createElement('div', {
      height: '100%',
      backgroundColor: color,
      borderRadius: '20px',
      width: '0%',
    })

    indicator.appendChild(progressBar)
    overlay.appendChild(indicator)
    return progressBar
  }

  private createMediaElement(
    type: 'image' | 'video' | 'audio',
    url: string,
    className?: string,
    style?: Partial<CSSStyleDeclaration>,
  ): HTMLImageElement | HTMLVideoElement | HTMLAudioElement {
    const element =
      type === 'image' ? new Image() : document.createElement(type)
    element.src = url
    element.autoplay = type !== 'image' // Автовоспроизведение только для видео и аудио

    if (className) element.className = className
    if (style) Object.assign(element.style, style)

    return element
  }

  private createElement(
    tag: string,
    styles: Partial<CSSStyleDeclaration>,
  ): HTMLDivElement {
    const element = document.createElement(tag)
    Object.assign(element.style, styles)
    return element
  }

  private appendToContainer(containerId: string, element: HTMLElement): void {
    const container = document.getElementById(containerId)
    if (container) {
      container.appendChild(element)
    } else {
      console.error(`Контейнер с id "${containerId}" не найден.`)
    }
  }

  private removeOverlay(overlay: HTMLDivElement): void {
    overlay.remove()
  }

  cancelAll(): void {
    this.activeLoads.forEach((url) => {
      console.log(`Загрузка ${url} отменена.`)
    })
    this.activeLoads.clear()
  }

  getLogs(): LogEntry[] {
    return this.logs
  }

  setTimeoutForLoad(url: string, timeout: number): void {
    setTimeout(() => {
      if (this.activeLoads.has(url)) {
        console.error(`Тайм-аут загрузки: ${url}`)
        this.cancelAll()
      }
    }, timeout)
  }
}
