# Portfolio — React + TypeScript + Vite

## Запуск

```bash
npm install
npm run dev
```

## Структура

```
src/
├── data/
│   └── projects.ts      ← ТУТ редагуй / додавай проекти
├── components/
│   ├── Nav.tsx           — навігація
│   ├── About.tsx         — секція "Про мене"
│   ├── Projects.tsx      — сітка проектів
│   ├── ProjectCard.tsx   — одна картка проекту
│   ├── Modal.tsx         — модальне вікно зі стеком
│   ├── ProjectDetail.tsx — повна сторінка проекту
│   └── Contact.tsx       — секція контактів
├── types/
│   └── index.ts          — TypeScript-типи
└── App.tsx               — головний компонент зі станом
```

## Як додати новий проект

Відкрий `src/data/projects.ts` та скопіюй один з об'єктів:

```ts
{
  id: 5,                          // унікальний номер
  slug: 'my-project',             // URL-slug (не використовується поки що)
  name: 'My Project',             // назва (відображається на картці)
  short: 'Короткий опис...',      // 1-2 речення для картки та модалки
  description: `
    <h3>Про проект</h3>
    <p>...</p>
  `,                              // повний HTML-опис для detail-сторінки
  stack: ['React', 'TypeScript'], // масив технологій
  year: '2026',
  githubUrl: 'https://github.com/...', // опціонально
  demoUrl: 'https://...',              // опціонально
  imageUrl: '/images/project.png',     // опціонально (скрін проекту)
}
```

## Скрін проекту

Поклади зображення у `public/images/` і вкажи:
```ts
imageUrl: '/images/my-project.png'
```
