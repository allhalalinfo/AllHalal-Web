# ✅ Готово! Ответы на вопросы iOS-приложения

---

## 1️⃣ URL-шаблон для открытия статей

```
https://allhalal.info/read/{slug}?app=true
```

**Примеры:**
```swift
// Базовый URL
let url = "https://allhalal.info/read/\(articleId)?app=true"

// С темной темой
let url = "https://allhalal.info/read/\(articleId)?app=true&theme=dark"

// Полный набор параметров
let url = "https://allhalal.info/read/\(articleId)?app=true&theme=auto&hide_related=true"
```

---

## 2️⃣ Скрытие шапки и футера ✅ **РЕАЛИЗОВАНО**

### Параметр: `?app=true`

**Что скрывается:**
- ✅ Header (верхняя навигация + логотип + меню)
- ✅ Footer (социальные сети + ссылки + legal + copyright)
- ✅ Sticky App Banner (плавающий баннер "Download app")
- ✅ Breadcrumbs (навигация Home / News / Read)

**Что остается:**
- ✅ Заголовок статьи (H1)
- ✅ Описание (dek)
- ✅ Главное изображение
- ✅ Полный контент статьи
- ✅ Related Articles (можно скрыть через `?hide_related=true`)

---

## 3️⃣ Темная тема (Dark Mode) ✅ **РЕАЛИЗОВАНО**

### Автоматическая темная тема:

```
https://allhalal.info/read/{slug}?app=true&theme=auto
```

**Как работает:**
- Использует CSS `@media (prefers-color-scheme: dark)`
- Автоматически переключается когда пользователь меняет тему в iOS
- **НЕ требует** перезагрузки WebView

### Ручная темная тема:

```swift
let isDarkMode = traitCollection.userInterfaceStyle == .dark
let theme = isDarkMode ? "dark" : "light"
let url = "https://allhalal.info/read/\(articleId)?app=true&theme=\(theme)"
```

**Поддерживаемые значения:**
- `?theme=auto` - автоматическое определение (рекомендуется)
- `?theme=dark` - принудительная темная тема
- `?theme=light` - принудительная светлая тема

---

## 4️⃣ Отключение всплывающих окон ✅ **РЕАЛИЗОВАНО**

### Параметр: `?app=true` (автоматически)

При `?app=true` отключаются:
- ✅ Cookie Consent Banner
- ✅ Newsletter Popup
- ✅ Push Notifications Request

**Дополнительно (опционально):**
```
?app=true&no_popups=true
```

---

## 🎯 Рекомендуемый URL для iOS

```swift
let articleId = "your-article-id"
let url = "https://allhalal.info/read/\(articleId)?app=true&theme=auto"
```

**Или с отслеживанием темы:**

```swift
func getArticleURL(articleId: String) -> String {
    let isDarkMode = traitCollection.userInterfaceStyle == .dark
    let theme = isDarkMode ? "dark" : "light"
    return "https://allhalal.info/read/\(articleId)?app=true&theme=\(theme)"
}
```

---

## 📋 Все доступные параметры

| Параметр | Значение | Описание |
|----------|----------|----------|
| `app` | `true` | Скрывает Header, Footer, Breadcrumbs, Banner |
| `theme` | `auto` / `dark` / `light` | Управление темой |
| `no_popups` | `true` | Отключает модальные окна (дубль app=true) |
| `hide_related` | `true` | Скрывает "Related Articles" |
| `hide_back_btn` | `true` | Скрывает кнопку "Back to News" |

---

## 📱 Минимальный рабочий код

```swift
import UIKit
import WebKit

class ArticleViewController: UIViewController {
    var webView: WKWebView!
    let articleId: String
    
    init(articleId: String) {
        self.articleId = articleId
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Setup WebView
        webView = WKWebView(frame: view.bounds)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(webView)
        
        // Load article with app mode
        let url = URL(string: "https://allhalal.info/read/\(articleId)?app=true&theme=auto")!
        webView.load(URLRequest(url: url))
    }
}
```

---

## 📖 Полная документация

Смотрите полное руководство с примерами Swift кода:

```
docs/IOS_WEBVIEW_INTEGRATION.md
```

**Содержание:**
- Полная спецификация URL-параметров
- Примеры Swift кода для WKWebView
- Настройка темной темы
- Обработка ошибок
- Блокировка popups
- Обработка ссылок
- FAQ и troubleshooting

---

## ✅ Статус реализации

- [x] URL-шаблон `/read/{slug}`
- [x] Параметр `?app=true` для скрытия Header/Footer
- [x] Скрытие Breadcrumbs в app mode
- [x] Скрытие Sticky Banner в app mode
- [x] Параметр `?theme=dark/light/auto`
- [x] CSS `@media (prefers-color-scheme: dark)`
- [x] Автоматическое отключение popups при `?app=true`
- [x] Дополнительные параметры (`hide_related`, `hide_back_btn`)
- [x] Темная тема для всех UI элементов (blockquotes, tables, code, FAQ, cards)
- [x] Документация для iOS разработчиков
- [x] Deployed to production ✨

---

## 🚀 Готово к использованию!

Все функции **уже задеплоены** и доступны на production:

```
https://allhalal.info/read/{articleId}?app=true&theme=auto
```

Можете тестировать прямо сейчас в Safari или WKWebView!

---

**Дата:** 2026-04-04  
**Статус:** ✅ Production Ready  
**Версия:** 1.0
