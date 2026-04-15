import { Project } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    slug: 'pinball',
    name: 'Pinball',
    demoUrl: 'https://pinball-react.vercel.app',
    short: 'Дослідження 2D фізичного рушія Matter.js — симуляція кульок з реалістичними колізіями, гравітацією та пружними об\'єктами.',
    short_en: 'Exploration of the 2D physics engine Matter.js — ball simulation with realistic collisions, gravity, and elastic bodies.',
    description: `
      <h3>Про проект</h3>
      <p>Pinball — sandbox-демо для глибокого вивчення можливостей бібліотеки Matter.js.
      Симулює реалістичну фізику пінболу: відскоки, гравітацію, обертальні тіла та polygon-колізії.</p>
      <h3>Що реалізовано</h3>
      <p>Фізичний рушій з налаштованими параметрами пружності та тертя. Canvas-рендеринг через Matter.Render.
      Кастомні аттрактори через matter-attractors для магнітних ефектів.</p>
      <h3>Що вивчалось</h3>
      <p>Rigid body dynamics, composites, constraints, event handling та оптимізація рендеру для складних фізичних сцен.</p>
    `,
    description_en: `
      <h3>About</h3>
      <p>Pinball is a sandbox demo for exploring the Matter.js physics library.
      It simulates realistic pinball physics: bounces, gravity, rotating bodies, and polygon collisions.</p>
      <h3>What's implemented</h3>
      <p>Physics engine with tuned elasticity and friction parameters. Canvas rendering via Matter.Render.
      Custom attractors via matter-attractors for magnetic effects.</p>
      <h3>What was learned</h3>
      <p>Rigid body dynamics, composites, constraints, event handling, and render optimization for complex physics scenes.</p>
    `,
    stack: ['TypeScript', 'Matter.js', 'Canvas API', 'matter-attractors', 'poly-decomp'],
    year: '2025',
  },

  {
    id: 2,
    slug: 'asteroids',
    name: 'Asteroids / RxJS',
    demoUrl: 'https://rxjs-asteroids-react.vercel.app/',
    short: 'Класична аркадна гра Asteroids, реалізована для практичного вивчення реактивного програмування з RxJS та event streams.',
    short_en: 'Classic arcade game Asteroids, built to practically learn reactive programming with RxJS and event streams.',
    description: `
      <h3>Про проект</h3>
      <p>Повна реалізація гри Asteroids на React та RxJS. Всі ігрові події
      (рух, стрільба, колізії) — це Observables.</p>
      <h3>Архітектура</h3>
      <p>Game loop побудований на RxJS streams. Стан гри — набір Observable,
      які комбінуються через merge, combineLatest та switchMap.
      Real-time синхронізація через WebSocket сервер на Express.</p>
      <h3>Backend</h3>
      <p>Node.js + Express + WebSockets для мультиплеєрного режиму.
      MongoDB для збереження рекордів гравців.</p>
    `,
    description_en: `
      <h3>About</h3>
      <p>A full implementation of Asteroids built with React and RxJS. All game events
      (movement, shooting, collisions) are Observables.</p>
      <h3>Architecture</h3>
      <p>Game loop built on RxJS streams. Game state is a set of Observables
      combined via merge, combineLatest, and switchMap.
      Real-time sync via a WebSocket server on Express.</p>
      <h3>Backend</h3>
      <p>Node.js + Express + WebSockets for multiplayer mode.
      MongoDB for storing player records.</p>
    `,
    stack: ['React 19', 'RxJS 7.8', 'TypeScript', 'WebSockets', 'Express 5', 'MongoDB'],
    year: '2025',
  },

  {
    id: 3,
    slug: 'threejs',
    name: 'Three.js Scene',
    demoUrl: 'https://threejs-react-psi.vercel.app',
    short: 'Інтерактивна 3D сцена з плавними анімаціями, постпроцесингом та реалістичним освітленням на React Three Fiber.',
    short_en: 'Interactive 3D scene with smooth animations, post-processing, and realistic lighting built with React Three Fiber.',
    description: `
      <h3>Про проект</h3>
      <p>Демо-сцена для вивчення можливостей Three.js через абстракцію React Three Fiber.
      Фокус — на анімаціях, шейдерах та постпроцесинг-ефектах.</p>
      <h3>Технічні деталі</h3>
      <p>Компоненти сцени (@react-three/drei) для швидкого прототипування.
      GSAP для складних timeline-анімацій.</p>
      <h3>Оптимізація</h3>
      <p>Instanced meshes для масових об'єктів, LOD для дистантних меш, lazy-loading геометрій.
      Підтримка WebGL 2.</p>
    `,
    description_en: `
      <h3>About</h3>
      <p>A demo scene for exploring Three.js capabilities through the React Three Fiber abstraction.
      Focus on animations, shaders, and post-processing effects.</p>
      <h3>Technical details</h3>
      <p>Scene components via @react-three/drei for rapid prototyping.
      GSAP for complex timeline animations.</p>
      <h3>Optimization</h3>
      <p>Instanced meshes for large object sets, LOD for distant meshes, lazy-loading of geometries.
      WebGL 2 support.</p>
    `,
    stack: ['React 19', 'Three.js 0.172', 'React Three Fiber', 'GSAP', 'TypeScript'],
    year: '2025',
  },

  {
    id: 4,
    slug: 'creative-builder',
    name: 'Creative Builder',
    demoUrl: 'https://creative-builder-xi.vercel.app',
    short: 'Інструмент для створення банерних рекламних креативів з drag-and-drop редактором елементів та SSR-рендерингом.',
    short_en: 'An internal tool for building banner ad creatives with a drag-and-drop element editor and SSR rendering.',
    description: `
      <h3>Про проект</h3>
      <p>Creative Builder — внутрішній інструмент для дизайнерів і маркетологів.
      Дозволяє будувати HTML-банери через WYSIWYG-редактор без написання коду.</p>
      <h3>Frontend</h3>
      <p>Angular 21 з NgRx для централізованого управління станом канвасу.
      Drag-and-drop через CDK. Кожен елемент (текст, зображення, відео, кнопка) — окремий компонент.</p>
      <h3>Архітектура</h3>
      <p>Monorepo на NX з окремими бібліотеками для компонентів, сервісів та утиліт.
      SSR через Angular Universal для серверного рендеру фінальних банерів.</p>
    `,
    description_en: `
      <h3>About</h3>
      <p>Creative Builder is an internal tool for designers and marketers.
      It allows building HTML banners through a WYSIWYG editor without writing code.</p>
      <h3>Frontend</h3>
      <p>Angular 21 with NgRx for centralized canvas state management.
      Drag-and-drop via CDK. Each element (text, image, video, button) is a standalone component.</p>
      <h3>Architecture</h3>
      <p>Monorepo on NX with separate libraries for components, services, and utilities.
      SSR via Angular Universal for server-side rendering of final banners.</p>
    `,
    stack: ['Angular 21', 'NgRx', 'TypeScript', 'NX Monorepo', 'Express', 'Vite', 'Angular SSR'],
    year: '2024',
  },
]
