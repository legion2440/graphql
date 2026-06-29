# GraphQL Profile

Статический профильный dashboard для Tomorrow School на HTML, CSS и vanilla JavaScript. Приложение авторизует пользователя через платформу 01 Edu, получает персональные данные через GraphQL и собирает их в отдельный интерфейс с профилем, прогрессом, навыками, статистикой, рейтингом и публичной витриной.

Проект не копирует существующий dashboard один в один. Мы переосмыслили его структуру и визуальный язык, а затем расширили данные задания информацией, которую используют официальные сервисы Tomorrow School. Там, где стабильного live-источника недостаточно, применяются датированные snapshots с явным указанием происхождения данных в интерфейсе.


## 📋 TOC

- [🚀 Как запустить](#-как-запустить)
- [📝 О проекте](#-о-проекте)
- [🔗 Ссылки](#-ссылки)
- [✨ Возможности](#-возможности)
- [🔌 Источники данных](#-источники-данных)
- [📊 Live, mixed и snapshot данные](#-live-mixed-и-snapshot-данные)
- [👁 Прозрачность данных в интерфейсе](#-прозрачность-данных-в-интерфейсе)
- [🔐 Авторизация и хранение сессии](#-авторизация-и-хранение-сессии)
- [🧰 GraphiQL](#-graphiql)
- [⚙️ Архитектура](#️-архитектура)
- [🧪 Проверка](#-проверка)
- [📁 Структура](#-структура)
- [⚠️ Ограничения](#️-ограничения)
- [🧑‍💻 Автор](#-автор)


## 🚀 Как запустить

Проект не требует сборки или установки зависимостей, но должен открываться через HTTP-сервер, поскольку использует ES modules.

Из корня проекта запустите любой статический сервер.

```bash
git clone https://01.tomorrow-school.ai/git/nyestaye/graphql
cd graphql
python -m http.server 8080
```
или
```bash
npx serve .
```

После запуска открыть:

`http://localhost:8080`


Приложение использует ES modules, поэтому открывать `index.html` напрямую через `file://` не следует.

Для входа используются логин или email и пароль от платформы Tomorrow School.

## 📝 О проекте

Базовое задание предполагает работу с GraphQL API платформы и визуализацию данных пользователя. В этой реализации задача расширена до полноценного профильного dashboard.

При разработке мы изучили Network-запросы официальных сервисов и сравнили данные из нескольких источников:

- обязательного GraphQL API задания;
- запросов и экранов официального dashboard;
- запросов и экранов Intra;
- публичной metadata curriculum.

Основные источники:

- `https://01.tomorrow-school.ai/api/graphql-engine/v1/graphql`
- `https://dashboard.tomorrow-school.ai/`
- `https://01.tomorrow-school.ai/intra/astanahub/profile?event=96`
- `https://01.tomorrow-school.ai/api/object/astanahub`

Dashboard и Intra помогли проверить бизнес-смысл полей, например уровень, batch, дату вступления в программу, текущий проект, навыки и рейтинг. Не все данные этих сервисов доступны как стабильные live-запросы для отдельного статического приложения. Поэтому часть информации сохранена в виде snapshots для полноты интерфейса.

Runtime приложения не подменяет персональные результаты snapshot-значениями. Пользовательский прогресс, XP, аудиты и профиль загружаются после авторизации.


## 🔗 Ссылки

* Основной репозиторий: `https://01.tomorrow-school.ai/git/nyestaye/graphql`
* GitHub mirror: `https://github.com/legion2440/graphql`
* Демо: `https://legion2440.github.io/graphql/`
* GraphiQL: `https://legion2440.github.io/graphql/graphiql.html`


## ✨ Возможности

### Профиль

- имя, login, ID и campus;
- batch текущей программы;
- текущий level;
- event XP и последняя XP-транзакция;
- количество завершённых проектов;
- audit ratio, `totalUp` и `totalDown`;
- текущий и следующий rank;
- последний подтверждённый skill.

### Прогресс

- лестница ranks;
- положение пользователя между ranks;
- timeline программы по месяцам;
- minimum, expected и checkpoint levels;
- предупреждение об отставании от текущей timeline row;
- персональная позиция рассчитывается от `event_user.createdAt`, то есть от даты вступления пользователя в программу.

### Навыки

- technical skills;
- technologies;
- completed / total для каждого skill;
- radar charts;
- breakdown по самым выраженным навыкам;
- отдельные режимы `Топ` и `Все` в публичном профиле.

Skills используют mixed policy: завершённые progress rows берутся из live API, включая достижения из дочерних events, а соответствие проектов навыкам определяется по curriculum metadata.

### Статистика

- карта активности по XP;
- cumulative XP chart;
- XP по проектам;
- audit ratio radial chart;
- radar навыков;
- распределение студентов по XP;
- фильтрация распределения по всем batches или текущему batch;
- настройка количества histogram bins.

### Рейтинг

- общий leaderboard;
- фильтрация по batches;
- level, XP, часы, текущий проект и trend;
- подсветка текущего пользователя, если он присутствует в snapshot.

### Публичный профиль

- публичная карточка пользователя;
- level, XP и audit ratio;
- live-агрегация по группам и аудитам;
- активные проекты и последние аудиты;
- skill radar для командной витрины.

### Интерфейс

- тёмная и светлая темы;
- сохранение темы в `localStorage`;
- вкладки с клавиатурной навигацией;
- адаптивная компоновка;
- SVG charts без charting libraries;
- поддержка `prefers-reduced-motion`;
- отдельные состояния загрузки, ошибок и недоступных optional-данных;
- встроенная GraphiQL-консоль с preset-запросами normal, nested и arguments;

## 🔌 Источники данных

### Live API

Авторизация:

POST `https://01.tomorrow-school.ai/api/auth/signin`

GraphQL:
POST `https://01.tomorrow-school.ai/api/graphql-engine/v1/graphql`


Основные GraphQL-запросы:

- `PROFILE_QUERY` - пользователь, campus и audit-поля;
- `XP_TRANSACTIONS_QUERY` - XP-транзакции event `96` и вложенные objects;
- `PROFILE_EVENT_QUERY` - membership пользователя, level, join date, batch labels и XP aggregates;
- `PROFILE_PROGRESS_QUERY` - progress текущего event и все завершённые progress rows;
- `PROFILE_GROUPS_QUERY` - группы, аудиты и public records;
- `PROFILE_CURRICULUM_QUERY` - доступная через GraphQL curriculum metadata.

`PROFILE_QUERY` и XP query являются обязательными. Event, progress, groups и curriculum загружаются параллельно как optional enrichment. Ошибка одного optional-запроса не блокирует весь профиль.

### Curriculum snapshot

Источник:
`https://01.tomorrow-school.ai/api/object/astanahub`


Дата snapshot:
`28.06.2026`


Snapshot содержит только публичную metadata curriculum:

- `timeline`;
- `ranksDefinitions`;
- `levelsDefinitions`;
- `baseSkills` объектов программы;
- пути и identity объектов.

Персональный progress в этот snapshot не входит.

### Leaderboard snapshot

Источник:
`https://dashboard.tomorrow-school.ai/`

Дата snapshot:
`27.06.2026`

Snapshot содержит:

- rank;
- login и display name;
- batch;
- level;
- XP;
- часы за период;
- текущий проект;
- trend.

Он используется для leaderboard и распределения студентов по XP.

## 📊 Live, mixed и snapshot данные

| Раздел            | Данные                                 | Источник                                              |
|-------------------|----------------------------------------|-------------------------------------------------------|
| Профиль           | login, имя, ID, campus                 | live GraphQL                                          |
| Профиль           | level, join date, batch                | live GraphQL                                          |
| Профиль           | audit ratio, total up/down             | live GraphQL                                          |
| Профиль           | total XP, latest XP                    | live GraphQL                                          |
| Профиль           | projects passed                        | live progress текущего event                          |
| Профиль           | current/next rank                      | live level + curriculum definitions                   |
| Профиль           | latest skill                           | live completed progress + metadata конкретного object |
| Прогресс          | текущий месяц программы                | live `event_user.createdAt` + timeline metadata       |
| Прогресс          | minimum/expected/checkpoint            | curriculum metadata, live или snapshot fallback       |
| Навыки            | completed projects                     | live progress                                         |
| Навыки            | связь project → skill и total objects  | curriculum `baseSkills`, live или snapshot fallback   |
| Статистика        | activity, cumulative XP, XP by project | live XP transactions                                  |
| Статистика        | audit radial                           | live audit values                                     |
| Статистика        | skills radar и breakdown               | mixed live progress + curriculum metadata             |
| Статистика        | XP distribution                        | leaderboard snapshot                                  |
| Рейтинг           | все строки leaderboard                 | dashboard snapshot                                    |
| Публичный профиль | user identity, level, XP, audit ratio  | live GraphQL                                          |
| Публичный профиль | groups, active projects, audits        | live optional GraphQL                                 |
| Публичный профиль | skill radar                            | mixed live progress + curriculum metadata             |

### Приоритет источников

Для curriculum metadata действует правило:
`live data > snapshot > unavailable`

Snapshot заполняет только отсутствующие attributes. Он не перезаписывает существующее live-значение, включая `0`, `false`, пустую строку, `null`, массив или object.

Objects сопоставляются по надёжным identifiers:

- `id`;
- нормализованный `path`;
- `name:type` только как fallback, если сильных identifiers нет.

Это предотвращает смешивание разных curriculum objects с одинаковым названием.

## 👁 Прозрачность данных в интерфейсе

Приложение явно сообщает происхождение неполностью live-данных.

При наведении мыши, keyboard focus или нажатии на touch-устройстве отображается tooltip:
`snapshot от DD.MM.YYYY`

Для ещё не реализованного элемента:
`Under construction`

Если незавершённый элемент одновременно использует snapshot:
`Under construction (snapshot от DD.MM.YYYY)`

Snapshot provenance назначается не всему dashboard целиком, а конкретному блоку и конкретным attributes, которые реально участвовали в расчёте.

Например:
- live `ranksDefinitions` не получают snapshot-label из-за отдельного snapshot `levelsDefinitions`;
- latest skill помечается snapshot только тогда, когда `baseSkills` именно последнего завершённого object были взяты из snapshot;
- radar навыков помечается snapshot, если в агрегате использовалась snapshot metadata.

Если подтверждённых данных нет, приложение показывает `—` или empty state, а не выдуманное числовое значение.

Сейчас как незавершённые или неподтверждённые остаются, в частности:
- точное значение checkpoint пользователя;
- skill tiers;
- сравнение XP пользователя со средней исторической серией потока;
- публичный статус доступности для команды.

## 🔐 Авторизация и хранение сессии

Приложение не имеет собственного backend.

1. Login/email и password отправляются напрямую в официальный endpoint `/api/auth/signin` через Basic Authorization.
2. Полученный JWT сохраняется в `sessionStorage`.
3. GraphQL-запросы отправляются с `Authorization: Bearer <token>`.
4. При logout или HTTP `401` token удаляется.
5. Token хранится только в `sessionStorage` browser session и не переносится в `localStorage`.

Password не сохраняется приложением.

### 🧰 GraphiQL

После авторизации GraphiQL доступен по адресу:

`https://legion2440.github.io/graphql/graphiql.html`

Консоль использует текущую browser session и автоматически добавляет JWT в Bearer Authorization.

В выпадающем меню доступны три обязательных типа запросов из задания:

- normal query;
- nested query;
- query with arguments and variables.

## ⚙️ Архитектура

### Frontend

- semantic HTML;
- CSS custom properties и темы;
- основной dashboard реализован на vanilla JavaScript;
- GraphiQL developer page использует официальный React-компонент GraphiQL через CDN;
- без build step и локальных npm-зависимостей.
- ES modules;
- Fetch API;
- SVG DOM API для charts;
- без build step;
- без frontend framework.

### Data flow

```text
signin
  ↓
JWT в sessionStorage
  ↓
обязательные profile + XP queries
  ↓
parallel optional enrichment
  ├── event
  ├── progress
  ├── groups / audits
  └── curriculum
  ↓
normalization
  ↓
live + snapshot merge с provenance
  ↓
derived metrics
  ↓
render dashboard
```

### Основные принципы

- mandatory query failure блокирует профиль;
- optional query failure приводит к частичной деградации;
- live attributes всегда приоритетнее snapshot;
- user progress никогда не заменяется curriculum snapshot;
- skills учитывают достижения current program и child events;
- timeline anchor берётся из персональной join date;
- неподтверждённые данные не маскируются под live.

## 🧪 Проверка

Базовая проверка JavaScript:

```bash
node --check js/*.js
```

Проверка whitespace в Git:

```bash
git diff --check
```

Для runtime-проверки:

1. запустить static server;
2. войти через аккаунт Tomorrow School;
3. проверить console на errors;
4. открыть все вкладки;
5. проверить tooltips snapshot и `Under construction`;
6. переключить light/dark theme;
7. проверить keyboard navigation вкладок.

## 📁 Структура

```text
graphql/
├── graphiql.html               # Developer page с GraphiQL-консолью
├── graphiql.css                # Стили страницы GraphiQL
├── index.html                  # Login, loading и dashboard markup
├── styles.css                  # Темы, layout, responsive UI и charts
├── js/
│   ├── app.js                  # Application flow и загрузка данных
│   ├── auth.js                 # Sign-in и работа с JWT
│   ├── charts.js               # SVG charts
│   ├── config.js               # API endpoints
│   ├── curriculum-snapshot.js  # Curriculum metadata snapshot
│   ├── data.js                 # Нормализация, merge и derived metrics
│   ├── graphiql-page.js        # GraphiQL presets, fetcher и auth state
│   ├── graphql.js              # GraphQL client и ошибки
│   ├── leaderboard-snapshot.js # Dashboard leaderboard snapshot
│   ├── queries.js              # GraphQL queries и variables
│   ├── theme.js                # Light/dark theme
│   ├── ui.js                   # Rendering и interactions
│   └── under-construction.js   # Placeholder и provenance tooltips
└── README.md
```

## ⚠️ Ограничения

- Текущая конфигурация ориентирована на Astana Module, event `96`.
- Для работы требуется действующий аккаунт Tomorrow School.
- Static hosting должен иметь возможность выполнять cross-origin запросы к API платформы.
- Leaderboard и XP distribution не являются real-time данными.
- Curriculum snapshot фиксирует состояние metadata на указанную дату.
- Некоторые официальные dashboard/Intra datasets не имеют подтверждённого стабильного endpoint для прямого runtime-использования.
- Проект является учебной независимой реализацией и не является официальным dashboard Tomorrow School.

## 🧑‍💻 Автор

- Nazar Yestayev (@nyestaye)
