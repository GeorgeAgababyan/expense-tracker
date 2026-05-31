# Expense Tracker

Веб-приложение для учёта личных расходов на **Next.js**, **TypeScript** и **Tailwind CSS**.

## Возможности

- Добавление расхода (сумма, категория, дата)
- Список всех расходов с сортировкой по дате
- Удаление расходов
- Итог за текущий календарный месяц
- Сохранение данных в `localStorage` браузера

## Структура

```
src/
  app/           — страницы и layout (App Router)
  components/    — UI-компоненты
  hooks/         — клиентская логика состояния
  lib/           — форматирование, хранение, расчёты
  types/         — типы TypeScript
```

## Запуск

```bash
cd ~/Projects/expense-tracker
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```
