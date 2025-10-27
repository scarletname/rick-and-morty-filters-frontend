# Rick and Morty Character Browser

Веб-приложение для просмотра персонажей из сериала Rick and Morty через публичное API.

## Что внутри

- React 18
- Styled Components
- Rick and Morty API
- Фильтрация по имени, типу, статусу, полу и виду
- Пагинация
- Адаптивная верстка

## Запуск

```bash
npm install
npm start
```

Приложение откроется на http://localhost:3000

## Сборка

```bash
npm run build
```

## Деплой

```bash
npm run deploy
```

## Структура

```
src/
├── components/       # Компоненты
├── assets/          # Картинки и иконки
├── App.js           # Главный компонент
└── index.js         # Точка входа
```

## Основные компоненты

- **Header** - логотип и фильтры
- **ItemsGrid** - сетка карточек персонажей
- **Card** - карточка персонажа
- **Popup** - модальное окно с деталями
- **Pagination** - навигация по страницам
- **DataProvider** - управление состоянием и API