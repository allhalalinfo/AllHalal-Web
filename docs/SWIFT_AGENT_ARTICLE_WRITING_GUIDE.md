# 📝 Руководство по написанию статей для AllHalal.info
## Для Swift AI Agent

---

## 🎯 КРИТИЧЕСКИ ВАЖНО

### ❌ НИКОГДА НЕ СОЗДАВАЙТЕ:
- **Секцию "Keep Learning"** с ссылками на статьи - она генерируется автоматически!
- **Секцию "Questions"** или "Common Questions" в конце статьи
- **Секцию "Connected Pages"** или аналогичные
- **Секцию "Final thought"** или "Final note"** - это дублирует Quick Answer!

### ✅ ОБЯЗАТЕЛЬНО СОЗДАВАЙТЕ:
- **References** в самом конце статьи (подробности ниже)
- **Citations** в тексте как `[N]` - только номера, БЕЗ названий источников

---

## 📐 Структура статьи (стандартный порядок)

```
1. Hero (заголовок H1, описание) - НЕ пишется в HTML контенте
2. Quick Answer / TL;DR (H2)
3. Why This Matters (H2)
4. Основной контент (H2 секции)
5. Step-by-Step / How to (H2) - опционально
6. Practical Examples (H2) - опционально
7. Common Mistakes (H2) - опционально
8. Key Takeaways (H2)
9. FAQ (H2)
10. Final CTA (H2) - ОБЯЗАТЕЛЬНО
11. References (H2) - ОБЯЗАТЕЛЬНО
```

**⚠️ КРИТИЧЕСКИ ВАЖНО:**
- **НЕ ДОБАВЛЯЙТЕ заголовок статьи (H1) в HTML контент!**
- Заголовок и описание статьи (`title` и `dek`) передаются отдельно и отображаются автоматически.
- HTML контент начинается **сразу с секции "Quick Answer"** (H2).
- Первый элемент в HTML контенте должен быть `<h2>Quick Answer</h2>`, а **НЕ** `<h1>Название статьи</h1>`.

**Пример ПРАВИЛЬНОЙ структуры HTML контента:**

```html
<!-- ✅ ПРАВИЛЬНО: Контент начинается с H2 -->
<h2>Quick Answer</h2>
<p>Краткий ответ...</p>

<h2>Why This Matters</h2>
<p>Объяснение важности...</p>

<!-- ... остальной контент ... -->
```

**Пример НЕПРАВИЛЬНОЙ структуры:**

```html
<!-- ❌ НЕПРАВИЛЬНО: НЕ добавляйте H1 в контент -->
<h1>Simple Islamic Habits for Young Children</h1>

<h2>Quick Answer</h2>
<p>Краткий ответ...</p>
```

---

## 🎨 ФОРМАТИРОВАНИЕ СЕКЦИЙ

### 1️⃣ Quick Answer / TL;DR / Summary

**Триггерные слова для автостилизации:**
- "Quick Answer"
- "TL;DR"
- "Summary"
- "In Short"

**Формат:**
```html
<h2>Quick Answer</h2>
<p>Один абзац с кратким ответом на главный вопрос статьи. Полное предложение, не просто фрагмент.</p>
```

**Визуальный результат:** Зелёная подсветка с иконкой галочки.

---

### 2️⃣ Why This Matters

**Триггерные слова:**
- "Why This Matters"
- "Why It Matters"
- "Why This Is Important"

**Формат:**
```html
<h2>Why This Matters</h2>
<p>Объяснение важности темы для читателя.</p>
```

---

### 3️⃣ Key Takeaways / Key Points

**Триггерные слова:**
- "Key Takeaways"
- "Key Points"

**Формат:**
```html
<h2>Key Takeaways</h2>
<ul>
  <li>Первый важный вывод</li>
  <li>Второй важный вывод</li>
  <li>Третий важный вывод</li>
</ul>
```

**Визуальный результат:** Маркированный список с золотыми точками.

**⚠️ ВАЖНО:** Используйте `<ul>` (маркированный список), НЕ `<ol>` (нумерованный).

---

### 4️⃣ Step-by-Step / How To

**Триггерные слова:**
- "Step-by-Step"
- "How to"
- "Method"
- "Process"

**Формат:**
```html
<h2>How to Check If a Product Is Halal</h2>
<ol>
  <li><strong>Step 1:</strong> Read the ingredient list carefully.</li>
  <li><strong>Step 2:</strong> Look for halal certification logos.</li>
  <li><strong>Step 3:</strong> Check the manufacturer's website.</li>
</ol>
```

**Визуальный результат:** Нумерованный список с цветными бейджами (1, 2, 3...).

**⚠️ ВАЖНО:** Используйте `<ol>` (нумерованный список) для шагов/процессов.

---

### 5️⃣ Practical Examples / Scenarios

**Триггерные слова:**
- "Practical Examples"
- "Example"
- "Scenario"
- "Case Study"

**Формат:**
```html
<h2>Practical Examples</h2>

<h3>Example 1: Checking gummy vitamins</h3>
<p>Описание примера с деталями...</p>

<h3>Example 2: Restaurant dining</h3>
<p>Описание второго примера...</p>

<h3>Example 3: Travel situations</h3>
<p>Описание третьего примера...</p>
```

**Визуальный результат:** Каждый H3 автоматически оборачивается в карточку с цветным номером (1, 2, 3...).

**⚠️ ВАЖНО:** 
- Используйте H3 для каждого примера (НЕ H2, НЕ H4)
- Все H3 должны быть ВНУТРИ секции "Practical Examples"

---

### 6️⃣ Common Mistakes / Errors to Avoid

**Триггерные слова:**
- "Common Mistakes"
- "Errors to Avoid"
- "Misconceptions"

**Формат:**
```html
<h2>Common Mistakes</h2>
<ol>
  <li><strong>Mistake 1: Thinking the herb itself is the whole question</strong>
  <p>Explanation of why this is wrong...</p></li>
  
  <li><strong>Mistake 2: Reading only the front of the bottle</strong>
  <p>Explanation...</p></li>
  
  <li><strong>Mistake 3: Assuming gummies are easier</strong>
  <p>Explanation...</p></li>
</ol>
```

**Визуальный результат:** Нумерованный список с красными крестиками (✗).

**⚠️ ВАЖНО:**
- Используйте `<ol>` (нумерованный список)
- НЕ выделяйте сам заголовок "Common Mistakes" красным цветом - это делается автоматически

---

### 7️⃣ FAQ (Frequently Asked Questions)

**Триггерные слова:**
- "FAQ"
- "Frequently Asked Questions"
- "Common Questions"

**Формат:**
```html
<h2>FAQ</h2>

<h3>What is halal gelatin?</h3>
<p>Detailed answer to the question...</p>

<h3>Can vegetarians consume halal products?</h3>
<p>Answer...</p>

<h3>Is halal certification mandatory?</h3>
<p>Answer...</p>
```

**Визуальный результат:** Аккордеон - вопросы видны сразу, ответы раскрываются по клику.

**⚠️ ВАЖНО:** 
- Используйте H3 для вопросов (НЕ маркированный список)
- Ответ пишите как обычный параграф `<p>` сразу после H3

---

### 8️⃣ Final CTA / Conclusion

**Триггерные слова:**
- "Final CTA"
- "Final Thoughts"
- "Conclusion"
- "Next Steps"
- "Bottom Line"

**Формат:**
```html
<h2>Final CTA</h2>
<p>Want a faster way to review ingredients and halal-related details while shopping? The <a href="https://app.allhalal.info">AllHalal app</a> helps you make more informed choices more easily.</p>
```

**Визуальный результат:**
- Заголовок "Final CTA" скрывается визуально (но остаётся в HTML для структуры)
- Контент отображается в светлом блоке по центру
- Ссылка на приложение становится золотой кнопкой

**⚠️ ВАЖНО:**
- Используйте точную ссылку: `https://app.allhalal.info`
- Текст может быть любой, но ссылка должна вести на одну из:
  - `https://app.allhalal.info` (веб-приложение)
  - `https://apps.apple.com/...` (App Store)
  - `https://play.google.com/...` (Google Play)

---

### 9️⃣ References (ОБЯЗАТЕЛЬНАЯ СЕКЦИЯ)

**Триггерные слова:**
- "References"
- "Sources"
- "Further Reading"

**Формат:**
```html
<h2>References</h2>
<ol>
  <li><a href="https://www.fda.gov/food/dietary-supplements">U.S. Food and Drug Administration - Dietary Supplements</a></li>
  <li><a href="https://halal.gov.my/v4/index.php">Department of Islamic Development Malaysia (JAKIM)</a></li>
  <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6413010/">National Center for Biotechnology Information - Halal Pharmaceuticals</a></li>
</ol>
```

**Визуальный результат:** Компактный нумерованный список с кликабельными ссылками, мелким шрифтом, скрываемый.

**⚠️ КРИТИЧЕСКИ ВАЖНО:**
- References ДОЛЖНЫ быть в конце статьи (последняя секция)
- Используйте `<ol>` (нумерованный список)
- Каждая ссылка должна иметь полное название источника
- Ссылки должны быть кликабельными: `<a href="URL">Full Source Name</a>`
- НЕ ПИШИТЕ просто номера - пишите полные названия!

---

## 🔗 СИСТЕМА ЦИТИРОВАНИЯ

### В тексте статьи

**Формат:**
```html
<p>FDA's supplement guidelines make clear that the "other ingredients" section can include things like gelatin and magnesium stearate. [1]</p>
```

**⚠️ КРИТИЧЕСКИ ВАЖНО:**
- Используйте только номер в квадратных скобках: `[1]`, `[2]`, `[3]`
- НЕ ДОБАВЛЯЙТЕ название источника после номера
- НЕ ДОБАВЛЯЙТЕ домен после номера
- НЕ используйте формат `[1] fda.gov` или `[1] FDA`

**Примеры:**
- ✅ **ПРАВИЛЬНО:** `...can include gelatin. [1]`
- ✅ **ПРАВИЛЬНО:** `...halal certification [2] is recommended.`
- ❌ **НЕПРАВИЛЬНО:** `...can include gelatin. [1] FDA`
- ❌ **НЕПРАВИЛЬНО:** `...can include gelatin. [1] fda.gov`
- ❌ **НЕПРАВИЛЬНО:** `...can include gelatin. [oai_citation:1‡FDA]`

### В секции References (в конце)

**Формат:**
```html
<h2>References</h2>
<ol>
  <li><a href="https://www.fda.gov/food/dietary-supplements">U.S. Food and Drug Administration - Dietary Supplements</a></li>
  <li><a href="https://halal.gov.my/v4/">Department of Islamic Development Malaysia (JAKIM)</a></li>
</ol>
```

**⚠️ КРИТИЧЕСКИ ВАЖНО:**
- Порядок ссылок в References должен соответствовать порядку [N] в тексте
- [1] в тексте = первая ссылка в References
- [2] в тексте = вторая ссылка в References
- Используйте ПОЛНОЕ название источника, а не просто домен

---

## 📝 ОБЩЕЕ ФОРМАТИРОВАНИЕ ТЕКСТА

### Параграфы

```html
<p>Обычный текст параграфа. Длина 2-4 предложения.</p>
```

**Визуальный результат:**
- Выравнивание по ширине (justify)
- Автоматические переносы слов
- Межстрочный интервал 1.7

### Выделение важных слов

**НЕ ИСПОЛЬЗУЙТЕ:**
- `<mark>` теги
- Подчеркивание через HTML
- Цветовое выделение

**Система автоматически находит и подчеркивает важные слова в тексте.**

**Если хотите явно выделить важный термин:**
```html
<strong>important term</strong>
```

### Списки

**Маркированный список** (для пунктов, идей, вариантов):
```html
<ul>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</ul>
```

**Нумерованный список** (для шагов, процессов, последовательностей):
```html
<ol>
  <li>Первый шаг</li>
  <li>Второй шаг</li>
  <li>Третий шаг</li>
</ol>
```

**⚠️ ВАЖНО:** НЕ используйте вложенные списки (списки внутри списков) - это усложняет вёрстку.

### Цитаты

```html
<blockquote>
  <p>Важная цитата из официального источника.</p>
</blockquote>
```

**Визуальный результат:** Блок с золотой левой границей и светлым фоном.

### Таблицы

```html
<table>
  <thead>
    <tr>
      <th>Product Type</th>
      <th>Halal Status</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Gelatin capsules</td>
      <td>❌ Usually not halal</td>
      <td>Often pork-derived</td>
    </tr>
    <tr>
      <td>Vegetable capsules</td>
      <td>✅ Generally halal</td>
      <td>Plant-based</td>
    </tr>
  </tbody>
</table>
```

**Визуальный результат:** Современная таблица с закруглёнными углами и тенью.

---

## 🔗 ССЫЛКИ И КНОПКИ

### Обычные ссылки в тексте

```html
<a href="https://example.com">текст ссылки</a>
```

**Визуальный результат:** Золотистое подчёркивание при наведении.

### Ссылки на приложение (станут кнопками автоматически)

**ТОЛЬКО ЭТИ ДОМЕНЫ превращаются в кнопки:**
- `https://app.allhalal.info` (наше веб-приложение)
- `https://apps.apple.com/...` (Apple App Store)
- `https://play.google.com/...` (Google Play)

```html
<p>Download the <a href="https://app.allhalal.info">AllHalal app</a> for instant scanning.</p>
```

**Визуальный результат:** Золотая кнопка с градиентом и тенью.

**⚠️ ВАЖНО:**
- НЕ добавляйте слово "download" в URL других сайтов (fda.gov/download и т.д.)
- Если в References есть ссылка с "download" в пути - это нормально, она не станет кнопкой

---

## 🚫 ЧТО НЕ ДЕЛАТЬ

### ❌ Не создавайте эти секции:

```html
<!-- НЕПРАВИЛЬНО - НЕ ПИШИТЕ ЭТО -->
<h2>Keep Learning</h2>
<ul>
  <li><a href="/article1">Similar Article 1</a></li>
  <li><a href="/article2">Similar Article 2</a></li>
</ul>

<!-- НЕПРАВИЛЬНО - дублирует Quick Answer -->
<h2>Final thought</h2>
<p>Ashwagandha is usually not difficult...</p>
```

**Причина:** 
- Секция "Keep Learning" генерируется автоматически на основе связанных статей из базы данных.
- Секция "Final thought" дублирует Quick Answer из начала статьи и выглядит странно в конце.

### ❌ Не используйте названия источников в тексте:

```html
<!-- НЕПРАВИЛЬНО -->
<p>According to FDA guidelines [1] fda.gov, gelatin is common.</p>
<p>JAKIM [2] halal.gov.my states that...</p>

<!-- ПРАВИЛЬНО -->
<p>According to FDA guidelines [1], gelatin is common.</p>
<p>JAKIM [2] states that...</p>
```

### ❌ Не используйте специальные форматы цитат:

```html
<!-- НЕПРАВИЛЬНО -->
<p>...gelatin is common [oai_citation:1‡FDA].</p>

<!-- ПРАВИЛЬНО -->
<p>...gelatin is common. [1]</p>
```

### ❌ Не пропускайте References:

```html
<!-- НЕПРАВИЛЬНО - статья без References -->
<h2>Key Takeaways</h2>
<ul>...</ul>

<h2>Final CTA</h2>
<p>...</p>
<!-- Конец статьи - НЕПРАВИЛЬНО! -->

<!-- ПРАВИЛЬНО -->
<h2>Key Takeaways</h2>
<ul>...</ul>

<h2>Final CTA</h2>
<p>...</p>

<h2>References</h2>
<ol>
  <li><a href="...">Full Source Name</a></li>
</ol>
```

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ

Перед отправкой статьи проверь:

### Структура
- [ ] Есть H1 заголовок (title статьи)
- [ ] Есть краткое описание (description)
- [ ] Есть секция "Quick Answer" или "Summary"
- [ ] Есть секция "Key Takeaways"
- [ ] Есть секция "FAQ"
- [ ] Есть секция "Final CTA"
- [ ] Есть секция "References" (последняя!)
- [ ] НЕТ секции "Keep Learning" (удалена!)
- [ ] НЕТ секций "Questions" или "Connected Pages"

### Форматирование
- [ ] Все H2 заголовки используют правильные ключевые слова
- [ ] Key Takeaways использует `<ul>` (маркированный список)
- [ ] Common Mistakes использует `<ol>` (нумерованный список)
- [ ] Step-by-Step использует `<ol>` (нумерованный список)
- [ ] FAQ использует H3 для вопросов
- [ ] Practical Examples использует H3 для каждого примера

### Цитирование
- [ ] В тексте цитаты как `[1]`, `[2]`, `[3]` - БЕЗ названий источников
- [ ] В References полные названия источников с ссылками
- [ ] Порядок [N] в тексте соответствует порядку в References
- [ ] НЕТ текста после номера цитаты: ❌ `[1] FDA`, ✅ `[1]`
- [ ] НЕТ доменов после номера: ❌ `[1] fda.gov`, ✅ `[1]`

### Ссылки
- [ ] Ссылки на приложение используют `https://app.allhalal.info`
- [ ] НЕТ слова "download" в URL обычных источников (кроме References)
- [ ] Все ссылки в References кликабельны и имеют полные названия

### Стиль
- [ ] Длина параграфов 2-4 предложения
- [ ] НЕТ ручного подчёркивания или выделения цветом
- [ ] НЕТ эмодзи (кроме таблиц при необходимости)
- [ ] Язык: английский (American English)
- [ ] Тон: профессиональный, информативный, дружелюбный

---

## 🎯 ПРИМЕР ИДЕАЛЬНОЙ СТРУКТУРЫ

```html
<!-- Hero Section (не в HTML контенте) -->
<!-- Title: Is Ashwagandha Halal? -->
<!-- Description: Learn whether ashwagandha supplements... -->

<!-- Article Content (начинается здесь) -->

<h2>Quick Answer</h2>
<p>Ashwagandha itself is generally halal...</p>

<h2>Why This Matters</h2>
<p>For Muslims seeking natural supplements...</p>

<h2>Understanding Ashwagandha</h2>
<p>Ashwagandha (Withania somnifera) is an adaptogenic herb [1] used in Ayurvedic medicine for centuries.</p>

<h2>What Makes Ashwagandha Halal or Haram</h2>
<p>The halal status depends on several factors [2]:</p>
<ul>
  <li>Capsule shell material (gelatin vs. vegetable)</li>
  <li>Other ingredients and additives</li>
  <li>Manufacturing process and cross-contamination</li>
</ul>

<h2>How to Check If Your Ashwagandha Is Halal</h2>
<ol>
  <li><strong>Step 1:</strong> Read the full ingredient list</li>
  <li><strong>Step 2:</strong> Look for halal certification logos</li>
  <li><strong>Step 3:</strong> Check the capsule material</li>
  <li><strong>Step 4:</strong> Research the manufacturer</li>
</ol>

<h2>Practical Examples</h2>

<h3>Example 1: Gelatin capsules</h3>
<p>A bottle labeled "Ashwagandha 500mg" may contain pork gelatin...</p>

<h3>Example 2: Vegetable capsules</h3>
<p>Products clearly stating "vegetable capsules" are safer...</p>

<h3>Example 3: Powder form</h3>
<p>Pure ashwagandha powder is the simplest option...</p>

<h2>Common Mistakes</h2>
<ol>
  <li><strong>Mistake 1: Thinking the herb itself is the whole question</strong>
  <p>The herb is halal, but the supplement format matters [3].</p></li>
  
  <li><strong>Mistake 2: Reading only the front label</strong>
  <p>Marketing terms like "natural" don't guarantee halal status.</p></li>
  
  <li><strong>Mistake 3: Assuming gummies are easier</strong>
  <p>Gummies often have more non-active ingredients to assess.</p></li>
</ol>

<h2>Key Takeaways</h2>
<ul>
  <li>Ashwagandha herb itself is halal</li>
  <li>Check capsule shell material (avoid pork gelatin)</li>
  <li>Look for halal certification when available</li>
  <li>Powder form is often the safest choice</li>
</ul>

<h2>FAQ</h2>

<h3>Is ashwagandha powder halal?</h3>
<p>Pure ashwagandha powder is generally halal...</p>

<h3>Are gummy vitamins halal?</h3>
<p>It depends on the gelatin source...</p>

<h3>Can I trust "vegetarian" labels?</h3>
<p>Vegetarian usually means plant-based, but verify...</p>

<h2>Final CTA</h2>
<p>Want a faster way to review ingredients while shopping? The <a href="https://app.allhalal.info">AllHalal app</a> helps you make informed choices instantly.</p>

<h2>References</h2>
<ol>
  <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3573577/">National Center for Biotechnology Information - Ashwagandha: A Review</a></li>
  <li><a href="https://halal.gov.my/v4/">Department of Islamic Development Malaysia (JAKIM)</a></li>
  <li><a href="https://www.fda.gov/food/dietary-supplements">U.S. Food and Drug Administration - Dietary Supplements</a></li>
</ol>
```

---

## 📊 SUMMARY (TL;DR для агента)

**Основные правила:**

1. **Структура:** Quick Answer → Why Matters → Content → Takeaways → FAQ → Final CTA → References
2. **НЕ создавай:** Keep Learning, Questions, Connected Pages
3. **Цитаты в тексте:** `[1]` - только номер, БЕЗ названий
4. **References:** Полные названия источников с ссылками (последняя секция)
5. **Списки:**
   - Takeaways = `<ul>` (маркированный)
   - Steps = `<ol>` (нумерованный)
   - Mistakes = `<ol>` (нумерованный)
6. **FAQ:** H3 для вопросов, `<p>` для ответов
7. **Practical Examples:** H2 для секции, H3 для каждого примера
8. **Final CTA:** Скрытый заголовок, контент с кнопкой на `app.allhalal.info`
9. **Ссылки-кнопки:** Только `app.allhalal.info`, `apps.apple.com`, `play.google.com`
10. **Язык:** American English, professional tone

---

**Последнее обновление:** 2026-04-04  
**Версия:** 1.0
