 ``vue-pattern-2024``
---
1. **[`Vue3`](https://vuejs.netlify.app/guide/introduction.html)**
2. **[`Vite`](https://vitejs.dev/guide/)**
3. **[`Vite/PWA`](https://vite-pwa-org.netlify.app/guide/)**
4. **[`Prettir`](https://prettier.io/docs/en/)**
5. **[`Eslint`](https://eslint.org/docs/latest/)**
6. **[`Pinia`](https://pinia.vuejs.org/introduction.html)**
7. **[`Router`](https://router.vuejs.org/installation.html)**
8. **[`Tailwind`](https://tailwindcss.com/docs/installation)**
9. **[`Typescript`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)**
_________________
```sh
  "dependencies": {
    "pinia": "^2.1.7",
    "vue": "^3.4.15",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.3.3",
    "@tsconfig/node20": "^20.1.2",
    "@types/node": "^20.11.10",
    "@vitejs/plugin-vue": "^5.0.3",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^12.0.0",
    "@vue/tsconfig": "^0.5.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "npm-run-all2": "^6.1.1",
    "postcss": "^8.4.33",
    "prettier": "^3.0.3",
    "tailwindcss": "^3.4.1",
    "typescript": "~5.3.0",
    "vite": "^5.0.11",
    "vue-tsc": "^1.8.27",
    "vite-plugin-pwa": "^0.20.0"
  }
```

_________________
### Установка проекта

```sh
npm install
```

### Доступные команды
```sh
npm run dev
```
> Запустит локальный сервер разработки
```sh
npm run dev:fix
```
> Запустит локальный сервер разработки если нет ошибок в коде, если есть ошибки, то они будут выведены в терминал
```sh
npm run build
```
> Запустит сборку проекта
```sh
npm run build:check
```
> Запустит сборку проекта с проверкой типов
```sh
npm run build:fix
```
> Запустит сборку проекта если нет ошибок в коде, если есть ошибки, то они будут выведены в терминал
```sh
npm run preview
```
> Запустит сборку проекта, после чего будет запушен сервер разработки в режиме preview
```sh
npm run type:check
```
> Запустит проверку типов
```sh
npm run prettier
```
> Запустит проверку кода prettier
```sh
npm run prettier:write
```
> Запустит форматирование кода prettier
```sh
npm run lint
```
> Запустит проверку кода eslint
```sh
npm run lint:write
```
> Запустит форматирование кода eslint
```sh
npm run fix
```
> Запустит форматирование кода prettier/eslint

_________________

#### Рекомендуемые команды
* **``run dev:fix``** - для запуска сервера 
* **``npm run fix``** - для проверки и форматирования кода
* **``npm run build:fix``** - для сборки проекта

> Для удобства в ``.vscode`` была добавлена настройка для автоматического форматирования кода при сохранении файла, благодаря этому вам не обязательно запускать команды отвечающие за форматирование проекта, так как форматирование будет автоматическое.