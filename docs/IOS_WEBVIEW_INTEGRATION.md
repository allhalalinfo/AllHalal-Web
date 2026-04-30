# 📱 Интеграция AllHalal WebView в iOS-приложение
## Руководство для iOS разработчиков

---

## 1️⃣ URL-шаблон для открытия статей

### ✅ Текущий URL-формат:

```
https://allhalal.info/read/{slug}
```

**Где `{slug}`** - это ID статьи (строка), которую вы получаете с бэкенда.

### Примеры:

```swift
// Пример 1: Числовой ID
let articleId = "123"
let url = "https://allhalal.info/read/\(articleId)"
// Результат: https://allhalal.info/read/123

// Пример 2: URL-friendly slug
let articleSlug = "is-ashwagandha-halal"
let url = "https://allhalal.info/read/\(articleSlug)"
// Результат: https://allhalal.info/read/is-ashwagandha-halal

// Пример 3: С параметром app mode (см. раздел 2)
let urlWithAppMode = "https://allhalal.info/read/\(articleId)?app=true"
// Результат: https://allhalal.info/read/123?app=true
```

### Swift код для WKWebView:

```swift
import WebKit

class ArticleViewController: UIViewController {
    var webView: WKWebView!
    var articleId: String
    
    init(articleId: String) {
        self.articleId = articleId
        super.init(nibName: nil, bundle: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Создаем WKWebView
        let configuration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: configuration)
        view.addSubview(webView)
        
        // URL статьи с параметром app mode
        let urlString = "https://allhalal.info/read/\(articleId)?app=true"
        guard let url = URL(string: urlString) else { return }
        
        let request = URLRequest(url: url)
        webView.load(request)
    }
}
```

---

## 2️⃣ App Mode - скрытие Header и Footer

### ✅ Параметр для скрытия интерфейса:

```
?app=true
```

**Полный URL:**
```
https://allhalal.info/read/{slug}?app=true
```

### Что скрывается при `?app=true`:

1. **Header (верхняя навигация)**
   - Логотип AllHalal
   - Главное меню (App, Halal Guides, Finance, Zakat, Travel, News, Blog)
   - Кнопка "Open app"

2. **Footer (нижний футер)**
   - Социальные сети
   - Ссылки на разделы сайта
   - Legal links (Privacy, Terms, etc.)
   - Copyright info

3. **Sticky App Banner**
   - Плавающий баннер "Download AllHalal app"

4. **Breadcrumbs (хлебные крошки)**
   - Навигационная цепочка "Home / News desk / Read"

### Что остаётся видимым:

- ✅ Заголовок статьи (H1)
- ✅ Описание статьи (dek)
- ✅ Главное изображение
- ✅ Полный контент статьи
- ✅ Related Articles (похожие статьи) — скрываются только с `?hide_related=true`
- ⛔ Кнопка **«Back to News»** в **app mode** **не показывается** (как и остальная оболочка). Параметр `hide_back_btn` используется **без** `app=true`, чтобы скрыть кнопку в обычном веб-просмотре.

### Swift пример:

```swift
// Базовый URL с app mode
let articleUrl = "https://allhalal.info/read/\(articleId)?app=true"

// С дополнительными параметрами (см. ниже)
let fullUrl = "https://allhalal.info/read/\(articleId)?app=true&hide_related=true"
```

---

## 3️⃣ Тема оформления (светлая / тёмная / авто)

### ✅ Текущий статус (сайт)

На странице статьи (`/read/{slug}`) реализовано:

- Атрибут **`data-theme`** на `<main>`: `light` | `dark` | `auto` (см. `app/(main)/read/[slug]/page.tsx`).
- Стили в **`app/globals.css`**: при `theme=auto` тёмная палитра включается через **`prefers-color-scheme: dark`**; при `theme=dark` / `theme=light` — принудительно.
- В **app mode** (`?app=true`) без явного `theme=light` страница следует тёмной/светлой схеме так же, как при `auto` (см. селекторы `[data-app-mode="true"]` в `globals.css`).

Логика query-параметров на сервере и клиенте: **`lib/appMode.ts`**.

#### Опция A: `theme=auto` (рекомендуется)

Параметр по умолчанию, если не передавать `theme` — сайт ориентируется на системные настройки (в т.ч. тёмный режим iOS).

#### Опция B: URL-параметр `theme=dark` | `theme=light`

```
?app=true&theme=dark
```

**Полный URL:**
```
https://allhalal.info/read/{slug}?app=true&theme=dark
```

Swift: привязка темы к устройству (внутри `UIViewController`, где доступен `traitCollection`):

```swift
import UIKit

func getArticleURL(articleId: String) -> String {
    let isDarkMode = traitCollection.userInterfaceStyle == .dark
    let theme = isDarkMode ? "dark" : "light"
    return "https://allhalal.info/read/\(articleId)?app=true&theme=\(theme)"
}

// Или отслеживание изменения темы:
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    super.traitCollectionDidChange(previousTraitCollection)
    
    if traitCollection.hasDifferentColorAppearance(comparedTo: previousTraitCollection) {
        // Перезагрузить WebView с новой темой
        let isDarkMode = traitCollection.userInterfaceStyle == .dark
        let theme = isDarkMode ? "dark" : "light"
        let urlString = "https://allhalal.info/read/\(articleId)?app=true&theme=\(theme)"
        
        if let url = URL(string: urlString) {
            webView.load(URLRequest(url: url))
        }
    }
}
```

### 🎨 Рекомендация для iOS

- Для **автосинхронизации с тёмной темой устройства** передавайте `theme=light` или `theme=dark` из `UITraitCollection` и при смене темы **перезагружайте** URL (как в примере ниже) **или** используйте `theme=auto` и один раз загрузите страницу — тогда **перезагрузка при смене темы не обязательна** (сайт реагирует на `prefers-color-scheme`).
- Если нужен **жёстко тёмный** или **жёстко светлый** вид независимо от системы — используйте `theme=dark` / `theme=light`.

---

## 4️⃣ Всплывающие окна и лишние баннеры

### ✅ Гарантированно скрыто при `?app=true` (см. код)

- **Header** и **плавающий баннер «Open app»** — `app/(main)/layout.tsx` (не рендерятся при `app=true`).
- На **странице статьи** — **footer**, **breadcrumbs** и (по умолчанию) **«Back to News»** — `app/(main)/read/[slug]/page.tsx`.

### Параметр `?no_popups=true`

В **`lib/appMode.ts`** функция **`shouldDisablePopups`** возвращает `true`, если в URL есть `no_popups=true` **или** `app=true`. Новые клиентские модули (баннеры, модалки) должны опираться на эту логику, чтобы не дублировать интерфейс приложения.

### Swift настройка WKWebView для блокировки нежелательных popups:

```swift
import WebKit

class ArticleViewController: UIViewController, WKUIDelegate, WKNavigationDelegate {
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let configuration = WKWebViewConfiguration()
        
        // Отключить JavaScript alert/confirm/prompt dialogs
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = false
        
        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        
        view.addSubview(webView)
        
        // Load article with app mode
        let urlString = "https://allhalal.info/read/\(articleId)?app=true"
        if let url = URL(string: urlString) {
            webView.load(URLRequest(url: url))
        }
    }
    
    // Блокировать все JavaScript alert/confirm/prompt
    func webView(_ webView: WKWebView, 
                 runJavaScriptAlertPanelWithMessage message: String, 
                 initiatedByFrame frame: WKFrameInfo, 
                 completionHandler: @escaping () -> Void) {
        completionHandler()
    }
    
    func webView(_ webView: WKWebView, 
                 runJavaScriptConfirmPanelWithMessage message: String, 
                 initiatedByFrame frame: WKFrameInfo, 
                 completionHandler: @escaping (Bool) -> Void) {
        completionHandler(false)
    }
    
    // Блокировать открытие новых окон
    func webView(_ webView: WKWebView, 
                 createWebViewWith configuration: WKWebViewConfiguration, 
                 for navigationAction: WKNavigationAction, 
                 windowFeatures: WKWindowFeatures) -> WKWebView? {
        // Открывать ссылки в том же WebView
        if let url = navigationAction.request.url {
            webView.load(URLRequest(url: url))
        }
        return nil
    }
}
```

---

## 📋 Полная спецификация URL-параметров

### Базовый формат:

```
https://allhalal.info/read/{slug}?param1=value1&param2=value2
```

### Поддерживаемые параметры:

| Параметр | Значения | Описание | Пример |
|----------|----------|----------|--------|
| `app` | `true` / `false` | Скрывает Header, Footer, Breadcrumbs, Sticky Banner | `?app=true` |
| `theme` | `light` / `dark` | Принудительная темная/светлая тема | `?app=true&theme=dark` |
| `no_popups` | `true` / `false` | Отключает все модальные окна (Cookie, Newsletter) | `?app=true&no_popups=true` |
| `hide_related` | `true` / `false` | Скрывает блок "Related Articles" | `?app=true&hide_related=true` |
| `hide_back_btn` | `true` / `false` | Скрывает кнопку "Back to News" | `?app=true&hide_back_btn=true` |

### Рекомендуемый URL для iOS WebView:

```
https://allhalal.info/read/{slug}?app=true&theme=auto
```

**Где `theme=auto`** - автоматическое определение темы через CSS `prefers-color-scheme`.

---

## 💡 Полный Swift пример интеграции

```swift
import UIKit
import WebKit

class ArticleWebViewController: UIViewController {
    
    // MARK: - Properties
    private var webView: WKWebView!
    private let articleId: String
    private var activityIndicator: UIActivityIndicatorView!
    
    // MARK: - Initialization
    init(articleId: String) {
        self.articleId = articleId
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // MARK: - Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        setupWebView()
        setupActivityIndicator()
        loadArticle()
    }
    
    // MARK: - Setup
    private func setupWebView() {
        let configuration = WKWebViewConfiguration()
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = false
        
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        
        view.addSubview(webView)
    }
    
    private func setupActivityIndicator() {
        activityIndicator = UIActivityIndicatorView(style: .large)
        activityIndicator.center = view.center
        activityIndicator.hidesWhenStopped = true
        view.addSubview(activityIndicator)
        activityIndicator.startAnimating()
    }
    
    private func loadArticle() {
        // Определить текущую тему устройства
        let isDarkMode = traitCollection.userInterfaceStyle == .dark
        let theme = isDarkMode ? "dark" : "light"
        
        // Собрать URL с параметрами app mode
        var urlComponents = URLComponents(string: "https://allhalal.info/read/\(articleId)")
        urlComponents?.queryItems = [
            URLQueryItem(name: "app", value: "true"),
            URLQueryItem(name: "theme", value: theme),
            URLQueryItem(name: "no_popups", value: "true")
        ]
        
        guard let url = urlComponents?.url else {
            print("❌ Failed to create article URL")
            return
        }
        
        print("✅ Loading article: \(url.absoluteString)")
        let request = URLRequest(url: url)
        webView.load(request)
    }
    
    // MARK: - Theme Change
    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        super.traitCollectionDidChange(previousTraitCollection)
        
        // Перезагрузить статью при изменении темы
        if traitCollection.hasDifferentColorAppearance(comparedTo: previousTraitCollection) {
            loadArticle()
        }
    }
}

// MARK: - WKNavigationDelegate
extension ArticleWebViewController: WKNavigationDelegate {
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        activityIndicator.stopAnimating()
        print("✅ Article loaded successfully")
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        activityIndicator.stopAnimating()
        print("❌ Failed to load article: \(error.localizedDescription)")
        
        // Показать alert с ошибкой
        let alert = UIAlertController(
            title: "Failed to Load Article",
            message: error.localizedDescription,
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "Retry", style: .default) { _ in
            self.loadArticle()
        })
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        present(alert, animated: true)
    }
    
    func webView(_ webView: WKWebView, 
                 decidePolicyFor navigationAction: WKNavigationAction, 
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        
        // Разрешить навигацию только внутри allhalal.info
        if let url = navigationAction.request.url,
           url.host == "allhalal.info" || url.host == "www.allhalal.info" {
            decisionHandler(.allow)
        } else if let url = navigationAction.request.url {
            // Внешние ссылки открывать в Safari
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
        } else {
            decisionHandler(.allow)
        }
    }
}

// MARK: - WKUIDelegate
extension ArticleWebViewController: WKUIDelegate {
    
    // Блокировать JavaScript alert
    func webView(_ webView: WKWebView, 
                 runJavaScriptAlertPanelWithMessage message: String, 
                 initiatedByFrame frame: WKFrameInfo, 
                 completionHandler: @escaping () -> Void) {
        completionHandler()
    }
    
    // Блокировать JavaScript confirm
    func webView(_ webView: WKWebView, 
                 runJavaScriptConfirmPanelWithMessage message: String, 
                 initiatedByFrame frame: WKFrameInfo, 
                 completionHandler: @escaping (Bool) -> Void) {
        completionHandler(false)
    }
    
    // Блокировать открытие новых окон
    func webView(_ webView: WKWebView, 
                 createWebViewWith configuration: WKWebViewConfiguration, 
                 for navigationAction: WKNavigationAction, 
                 windowFeatures: WKWindowFeatures) -> WKWebView? {
        return nil
    }
}
```

---

## 🎯 Быстрый старт (TL;DR)

### Минимальный рабочий код:

```swift
import WebKit

class ArticleVC: UIViewController {
    var webView: WKWebView!
    var articleId: String
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        webView = WKWebView(frame: view.bounds)
        view.addSubview(webView)
        
        let url = URL(string: "https://allhalal.info/read/\(articleId)?app=true")!
        webView.load(URLRequest(url: url))
    }
}
```

### Рекомендуемый URL:

```
https://allhalal.info/read/{articleId}?app=true&theme=auto&no_popups=true
```

---

## 🔧 Статус реализации (фронтенд allhalal.info)

### ✅ Реализовано:

- [x] URL `/read/{slug}` и загрузка кастомных статей
- [x] `?app=true` — скрытие оболочки сайта (header/footer в корневом layout, breadcrumbs на странице статьи, баннер приложения)
- [x] `?theme=light|dark|auto` + стили в `app/globals.css` (в т.ч. `prefers-color-scheme` для `auto`)
- [x] `?no_popups=true` и `shouldDisablePopups` в `lib/appMode.ts` (для новых модалок — подключать эту проверку на клиенте)
- [x] `?hide_related=true`, `?hide_back_btn=true`

---

## 📞 Следующие шаги (клиент iOS)

1. **Сборка URL** по таблице параметров выше; для продакшена зафиксировать минимальный набор (часто: `app=true&no_popups=true` и при необходимости `hide_related` / `hide_back_btn`).
2. **Политика внешних ссылок** — как в примере с `decidePolicyFor` (только `allhalal.info` в WebView, остальное в Safari / `SFSafariViewController`).
3. **Проверки:** Safari, WKWebView, смена светлой/тёмной темы, отсутствие лишних модалок в app mode.

---

**Автор:** AllHalal Web Team  
**Дата:** 2026-04-24  
**Версия:** 1.1

---

## ❓ Часто задаваемые вопросы

### Q: Можно ли передавать параметры через POST вместо GET?

**A:** Да, можно использовать `WKWebView.load()` с `URLRequest` и HTTP headers:

```swift
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.addValue("true", forHTTPHeaderField: "X-App-Mode")
request.addValue("dark", forHTTPHeaderField: "X-Theme")
webView.load(request)
```

Но рекомендуется использовать GET-параметры для простоты.

### Q: Как кэшировать статьи для оффлайн-режима?

**A:** Используйте `WKWebsiteDataStore` для кэширования:

```swift
let config = WKWebViewConfiguration()
config.websiteDataStore = WKWebsiteDataStore.default()
```

Или реализуйте собственный кэш с `URLCache`.

### Q: Как отслеживать скролл статьи для аналитики?

**A:** Используйте JavaScript injection:

```swift
webView.evaluateJavaScript("document.documentElement.scrollTop") { (result, error) in
    if let scrollTop = result as? CGFloat {
        print("Scroll position: \(scrollTop)")
    }
}
```

### Q: Можно ли кастомизировать стили статьи из iOS?

**A:** Да, через JavaScript injection:

```swift
let js = """
document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont';
document.body.style.fontSize = '18px';
"""
webView.evaluateJavaScript(js, completionHandler: nil)
```

Но лучше использовать URL-параметры (например, `?font_size=large`).

---

## 🔗 Полезные ссылки

- [WKWebView Documentation](https://developer.apple.com/documentation/webkit/wkwebview)
- [AllHalal Web (репозиторий)](https://github.com/allhalalinfo/AllHalal-Web)
- [CSS prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
