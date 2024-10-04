<script setup lang="ts"></script>

<template>
  <div class="my-5 flex flex-col">
    <div class="container">
      <h2 class="mb-2">Описание</h2>
      <p class="mb-2">
        <strong>MediaLoader</strong> — это класс для загрузки медиафайлов
        (изображений, видео и аудио) с поддержкой параллельной загрузки,
        кэширования и обработки событий загрузки. Он позволяет отслеживать
        прогресс загрузки и управлять состоянием медиафайлов.
      </p>

      <h2 class="mb-3">Интерфейсы</h2>

      <h3 class="mb-2">MediaItem</h3>
      <p>Интерфейс для определения медиафайла.</p>
      <pre><code>export interface MediaItem {
    container: string; // ID контейнера, в который будет добавлено медиа
    url: string; // URL медиафайла
    type: 'image' | 'video' | 'audio'; // Тип медиафайла
    progressColor?: string; // Цвет индикатора прогресса (по умолчанию зеленый)
    className?: string; // Класс для добавления к элементу
    style?: Partial&lt;CSSStyleDeclaration&gt;; // Стиль для медиаэлемента
}</code></pre>

      <h3>Callbacks</h3>
      <p>
        Интерфейс для обратных вызовов, которые будут вызваны в процессе
        загрузки.
      </p>
      <pre><code>export interface Callbacks {
    onStart?: (url: string) =&gt; void; // Вызывается при начале загрузки
    onProgress?: (url: string, progress: number) =&gt; void; // Вызывается при обновлении прогресса
    onComplete?: (url: string) =&gt; void; // Вызывается при завершении загрузки
    onError?: (url: string, error: string) =&gt; void; // Вызывается при ошибке загрузки
}</code></pre>

      <h3>LogEntry</h3>
      <p>Интерфейс для записи ошибок загрузки.</p>
      <pre><code>export interface LogEntry {
    url: string; // URL медиафайла
    error: string; // Сообщение об ошибке
}</code></pre>

      <h2>Класс MediaLoader</h2>

      <h3>Конструктор</h3>
      <pre><code>constructor(opacity: number = 0.5, maxConcurrentLoads: number = 5)</code></pre>
      <ul>
        <li>
          <code>opacity</code>: Прозрачность оверлея при загрузке (значение от 0
          до 1).
        </li>
        <li>
          <code>maxConcurrentLoads</code>: Максимальное количество одновременно
          загружаемых файлов.
        </li>
      </ul>

      <h3>Методы</h3>

      <h4>
        loadMedia(mediaList: MediaItem[], callbacks: Callbacks):
        Promise&lt;void[]&gt;
      </h4>
      <p>Запускает загрузку списка медиафайлов.</p>
      <ul>
        <li>
          <code>mediaList</code>: Массив объектов <code>MediaItem</code>,
          описывающих медиафайлы.
        </li>
        <li>
          <code>callbacks</code>: Объект <code>Callbacks</code>, содержащий
          функции для обработки событий загрузки.
        </li>
      </ul>
      <p>
        Возвращает промис, который разрешается, когда все загрузки завершены.
      </p>

      <h4>cancelAll(): void</h4>
      <p>Отменяет все активные загрузки.</p>

      <h4>getLogs(): LogEntry[]</h4>
      <p>Возвращает массив логов с записями ошибок загрузки.</p>

      <h4>setTimeoutForLoad(url: string, timeout: number): void</h4>
      <p>Устанавливает тайм-аут для загрузки медиафайла.</p>
      <ul>
        <li><code>url</code>: URL медиафайла.</li>
        <li>
          <code>timeout</code>: Время в миллисекундах, после которого загрузка
          будет отменена, если не завершена.
        </li>
      </ul>

      <h2>Пример использования</h2>
      <div class="example">
        <pre><code>const mediaLoader = new MediaLoader(0.5, 3);

const mediaItems: MediaItem[] = [
    {
        container: 'imageContainer',
        url: 'https://example.com/image1.jpg',
        type: 'image',
        progressColor: 'blue',
    },
    {
        container: 'videoContainer',
        url: 'https://example.com/video1.mp4',
        type: 'video',
    },
    {
        container: 'audioContainer',
        url: 'https://example.com/audio1.mp3',
        type: 'audio',
    },
];

const callbacks: Callbacks = {
    onStart: (url) =&gt; console.log(`Начата загрузка: ${url}`),
    onProgress: (url, progress) =&gt; console.log(`Загрузка ${url}: ${progress}%`),
    onComplete: (url) =&gt; console.log(`Загрузка завершена: ${url}`),
    onError: (url, error) =&gt; console.error(`Ошибка загрузки ${url}: ${error}`),
};

mediaLoader.loadMedia(mediaItems, callbacks)
    .then(() =&gt; console.log('Все загрузки завершены'))
    .catch((error) =&gt; console.error(`Ошибка загрузки: ${error}`));</code></pre>
      </div>

      <h2>Дополнительные примеры</h2>

      <h3>Пример 1: Загрузка изображений</h3>
      <div class="example">
        <pre><code>const imageLoader = new MediaLoader(0.3, 2);

const imageItems = [
    {
        container: 'imageContainer',
        url: 'https://example.com/image1.jpg',
        type: 'image',
    },
    {
        container: 'imageContainer',
        url: 'https://example.com/image2.jpg',
        type: 'image',
    },
];

const imageCallbacks = {
    onStart: (url) => console.log(`Начата загрузка изображения: ${url}`),
    onProgress: (url, progress) => console.log(`Загрузка ${url}: ${progress}%`),
    onComplete: (url) => console.log(`Загрузка изображения завершена: ${url}`),
    onError: (url, error) => console.error(`Ошибка загрузки изображения ${url}: ${error}`),
};

imageLoader.loadMedia(imageItems, imageCallbacks)
    .then(() => console.log('Все изображения загружены'))
    .catch((error) => console.error(`Ошибка загрузки изображений: ${error}`));</code></pre>
      </div>

      <h3>Пример 2: Загрузка видео</h3>
      <div class="example">
        <pre><code>const videoLoader = new MediaLoader(0.5, 1);

const videoItems = [
    {
        container: 'videoContainer',
        url: 'https://example.com/video1.mp4',
        type: 'video',
        progressColor: 'orange',
    },
];

const videoCallbacks = {
    onStart: (url) => console.log(`Начата загрузка видео: ${url}`),
    onProgress: (url, progress) => console.log(`Загрузка ${url}: ${progress}%`),
    onComplete: (url) => console.log(`Загрузка видео завершена: ${url}`),
    onError: (url, error) => console.error(`Ошибка загрузки видео ${url}: ${error}`),
};

videoLoader.loadMedia(videoItems, videoCallbacks)
    .then(() => console.log('Все видео загружены'))
    .catch((error) => console.error(`Ошибка загрузки видео: ${error}`));</code></pre>
      </div>

      <h3>Пример 3: Загрузка аудио с тайм-аутом</h3>
      <div class="example">
        <pre><code>const audioLoader = new MediaLoader(0.2, 1);

const audioItems = [
    {
        container: 'audioContainer',
        url: 'https://example.com/audio1.mp3',
        type: 'audio',
    },
];

const audioCallbacks = {
    onStart: (url) => console.log(`Начата загрузка аудио: ${url}`),
    onProgress: (url, progress) => console.log(`Загрузка ${url}: ${progress}%`),
    onComplete: (url) => console.log(`Загрузка аудио завершена: ${url}`),
    onError: (url, error) => console.error(`Ошибка загрузки аудио ${url}: ${error}`),
};

audioLoader.loadMedia(audioItems, audioCallbacks)
    .then(() => {
        console.log('Все аудио загружены');
    })
    .catch((error) => {
        console.error(`Ошибка загрузки аудио: ${error}`);
    });

// Установка тайм-аута для загрузки
audioLoader.setTimeoutForLoad(audioItems[0].url, 5000); // 5 секунд</code></pre>
      </div>

      <h3>Пример 4: Загрузка с обработкой ошибок</h3>
      <div class="example">
        <pre><code>const mixedLoader = new MediaLoader(0.4, 3);

const mixedItems = [
    {
        container: 'imageContainer',
        url: 'https://example.com/nonexistent.jpg', // Неверный URL для демонстрации ошибки
        type: 'image',
    },
    {
        container: 'videoContainer',
        url: 'https://example.com/video1.mp4',
        type: 'video',
    },
    {
        container: 'audioContainer',
        url: 'https://example.com/audio1.mp3',
        type: 'audio',
    },
];

const mixedCallbacks = {
    onStart: (url) => console.log(`Начата загрузка: ${url}`),
    onProgress: (url, progress) => console.log(`Загрузка ${url}: ${progress}%`),
    onComplete: (url) => console.log(`Загрузка завершена: ${url}`),
    onError: (url, error) => console.error(`Ошибка загрузки ${url}: ${error}`),
};

mixedLoader.loadMedia(mixedItems, mixedCallbacks)
    .then(() => console.log('Все загрузки завершены'))
    .catch((error) => console.error(`Ошибка загрузки: ${error}`));</code></pre>
      </div>

      <h3>Пример 5: Кэширование медиафайлов</h3>
      <div class="example">
        <pre><code>const cacheLoader = new MediaLoader(0.5, 2);

const cacheItems = [
    {
        container: 'imageContainer',
        url: 'https://example.com/image1.jpg',
        type: 'image',
    },
    {
        container: 'imageContainer',
        url: 'https://example.com/image1.jpg', // Повторная загрузка для проверки кэширования
        type: 'image',
    },
];

const cacheCallbacks = {
    onStart: (url) => console.log(`Начата загрузка (кэш): ${url}`),
    onProgress: (url, progress) => console.log(`Загрузка ${url}: ${progress}%`),
    onComplete: (url) => console.log(`Загрузка завершена (кэш): ${url}`),
    onError: (url, error) => console.error(`Ошибка загрузки (кэш) ${url}: ${error}`),
};

cacheLoader.loadMedia(cacheItems, cacheCallbacks)
    .then(() => console.log('Все загрузки (кэш) завершены'))
    .catch((error) => console.error(`Ошибка загрузки (кэш): ${error}`));</code></pre>
      </div>

      <p class="my-2">
        Эти примеры демонстрируют разные аспекты использования
        <strong>MediaLoader</strong>. Они показывают, как работать с
        изображениями, видео и аудио, обрабатывать прогресс загрузки,
        устанавливать тайм-ауты и использовать кэширование. Каждый из примеров
        можно адаптировать под свои нужды, добавляя необходимые настройки и
        обработчики.
      </p>

      <h2>Заключение</h2>
      <p>
        <strong>MediaLoader</strong> — мощный инструмент для загрузки
        медиафайлов с поддержкой кэширования и обработки событий. Он позволяет
        легко управлять процессом загрузки и отслеживать состояние медиафайлов.
      </p>
    </div>

    <footer>
      <p>© 2024 MediaLoader Documentation</p>
    </footer>
  </div>
</template>
<style lang="css" scoped>
body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  background-color: #f4f7fa;
  color: #333;
}
header {
  text-align: center;
  padding: 20px;
  background: #0366d6;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
}
h1 {
  margin: 0;
  font-size: 2.5em;
}
h2,
h3 {
  color: #0366d6;
}
pre {
  background: #eff4fc;
  border-left: 4px solid #0366d6;
  border-radius: 5px;
  padding: 15px;
  overflow: auto;
  margin: 20px 0;
}
code {
  font-family: 'Courier New', Courier, monospace;
  background: #eff4fc;
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
}
ul {
  margin-left: 20px;
  padding-left: 0;
  list-style-type: disc;
}
li {
  margin-bottom: 10px;
}
a {
  color: #0366d6;
  text-decoration: none;
  transition: color 0.2s;
}
a:hover {
  text-decoration: underline;
}
.container {
  width: 100vw;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--surface);
}
.example {
  background: #f7f9fa;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
footer {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9em;
  color: #666;
}
</style>
