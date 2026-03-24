# Контент для кастомных статей: галереи, таблицы, кастомные элементы

**Краткий ответ:** через HTML в поле **`content`**, не нужны отдельные поля на backend.

---

## Что уже поддерживается

Поле `content` — это **HTML**. При рендере на странице `/en/read/{id}` применяется `sanitize-html` (пропускает безопасные теги). **Разрешены:**

- Заголовки: `h1`, `h2`, `h3`, `h4`  
- Текст: `p`, `strong`, `em`, `blockquote`, `code`, `pre`  
- Списки: `ul`, `ol`, `li`  
- Ссылки: `<a href="..." target="_blank" rel="noopener">`  
- **Картинки:** `<img src="..." alt="..." class="...">`  
- **Таблицы:** `<table>`, `<tr>`, `<td>`, `<th>`, `<thead>`, `<tbody>` — с классами и `colspan`/`rowspan`  
- **Обёртки:** `<div class="...">`, `<span class="...">`  

**Не пропускаются:** `<script>`, `<iframe>`, inline JS — всё через `sanitize-html`.

---

## Несколько фото (галерея)

**Вариант 1: простой список**

```html
<h2>Photo gallery</h2>
<div class="gallery">
  <img src="https://…/photo1.jpg" alt="Caption 1" />
  <img src="https://…/photo2.jpg" alt="Caption 2" />
  <img src="https://…/photo3.jpg" alt="Caption 3" />
</div>
```

**Вариант 2: через `figure` (семантичнее)**

```html
<figure>
  <img src="…" alt="Photo 1" />
  <figcaption>Description for photo 1</figcaption>
</figure>
<figure>
  <img src="…" alt="Photo 2" />
  <figcaption>Description for photo 2</figcaption>
</figure>
```

**CSS для галереи:** можно дописать в `app/globals.css` правило:

```css
.prose .gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
.prose .gallery img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
```

Класс `.prose` уже применён на странице чтения (`/read/[slug]/page.tsx`).

---

## Таблицы

Backend **не** должен ничего менять — просто пишите в HTML:

```html
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price (USD)</th>
      <th>Halal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Chicken</td>
      <td>$5.99</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Beef</td>
      <td>$12.99</td>
      <td>Check label</td>
    </tr>
  </tbody>
</table>
```

**CSS:** если хотите таблицы с границами, в `app/globals.css`:

```css
.prose table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5rem 0;
}
.prose th,
.prose td {
  border: 1px solid rgba(47, 37, 30, 0.12);
  padding: 0.75rem;
  text-align: left;
}
.prose th {
  background: rgba(241, 235, 226, 0.5);
  font-weight: 600;
}
```

---

## Кастомные элементы (цитаты, врезки, инфобоксы)

**Через CSS-классы:**

```html
<div class="info-box">
  <strong>Did you know?</strong>
  <p>Zakat on gold is due when you hold 85 grams for one lunar year.</p>
</div>
```

В `globals.css`:

```css
.prose .info-box {
  background: rgba(244, 185, 66, 0.1);
  border-left: 4px solid rgba(244, 185, 66, 0.6);
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 0.5rem;
}
.prose .info-box strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #5c4a32;
}
```

Аналогично можно сделать `.warning-box`, `.tip-box`, и т.д.

---

## Загрузка картинок для контента

- **Обложка:** кнопка **Upload file** в админке → `image_url`.  
- **Картинки в тексте:**  
  1. Загрузите через **Upload file** (получите URL).  
  2. Вставьте в HTML вручную: `<img src="https://api.allhalal.info/custom-media/…" alt="…">`.  
  3. Или: загрузите в Cloudflare R2 / другой CDN → вставьте URL.

**Backend ничего не меняет:** одна и та же кнопка upload, просто URL вставляете куда нужно.

---

## Нужно ли массив `image_urls[]` на backend?

**Нет.** Достаточно одной `image_url` для **обложки**; остальные картинки — через `<img>` в HTML. Если позже захотите отдельную галерею на карточке (превью нескольких фото) — можно добавить, но сейчас проще держать всё в HTML.

---

## Что добавить, если нужны черновики / расписание

**Уже в коде (только что):**

- **`status`** — `draft` / `published` / `scheduled` (выпадающий список в форме).  
- **`content_type`** — `article` / `guide` / `blog-post` / `news-analysis`.  
- **`featured`** — чекбокс "Featured on home" (для выделения на главной).

На **backend** достаточно принимать эти три поля в POST/PUT (как строки/boolean); фронт **при чтении** может фильтровать `status === "published"` и `published_at <= now`, если захотите.

---

## Промпт для backend (дополнение)

Скопируйте и добавьте в **`docs/BACKEND_PROMPT_CUSTOM_WRITE_RU.md`** после раздела о полях:

```
### Новые опциональные поля (март 2026)

- `content_type` (string | null): article / guide / blog-post / news-analysis  
- `status` (string | null): draft / published / scheduled  
- `featured` (boolean | null): показывать на главной как featured

Все три поля необязательные (backend может не хранить или не валидировать). Фронт при GET списка может фильтровать `status === "published"` и `published_at <= now()` для публичной выдачи.
```

Backend **может** реализовать фильтр по статусу в `GET /articles?status=published`, но **не обязательно** — фронт сам отфильтрует при рендере главной.

---

## Итого

| Что | Как сделать |
|-----|-------------|
| **Несколько фото** | `<img>` в HTML контента, обёртка `<div class="gallery">` + CSS. |
| **Таблицы** | `<table><tr><td>…` в HTML, CSS для границ. |
| **Кастомные врезки** | `<div class="info-box">…` + CSS. |
| **Статусы / типы** | Добавлены в форму, backend принимает как строки (необязательные). |
| **Отдельное поле массива фото** | **Не нужно** — всё через HTML в `content`. |

**Код Cursor** — только CSS для галерей/таблиц (если захотите), остальное работает из коробки.
