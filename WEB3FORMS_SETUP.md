# 📧 Web3Forms Setup (Простейший вариант)

## ✅ Преимущества Web3Forms

- **Бесплатно навсегда** (250 сообщений/месяц)
- **Регистрация 30 секунд**
- **Не нужен backend код** (работает из браузера)
- **Email приходят мгновенно**
- **Защита от спама встроена**

---

## 🚀 Настройка за 3 шага

### Шаг 1: Получи Access Key (30 секунд)

1. Иди на **[web3forms.com](https://web3forms.com)**
2. Введи свой email: `app@allhalal.info`
3. Нажми **"Get Started"**
4. Проверь почту и подтверди email
5. **Скопируй Access Key** (выглядит как `a1b2c3d4-...`)

---

### Шаг 2: Добавь в Vercel

1. Иди в **[Vercel Dashboard](https://vercel.com)**
2. Выбери проект `AllHalal-Web`
3. **Settings** → **Environment Variables**
4. Добавь переменную:
   ```
   Name: NEXT_PUBLIC_WEB3FORMS_KEY
   Value: твой_access_key_сюда
   ```
5. Выбери все окружения (Production, Preview, Development)
6. Нажми **Save**

---

### Шаг 3: Redeploy

1. В Vercel нажми **"Redeploy"**
2. Готово! ✅

---

## 📧 Как работает

```
User fills form → Web3Forms API → Email to app@allhalal.info
```

**Email format:**
```
From: noreply@web3forms.com
Reply-To: user@example.com (email пользователя)
Subject: [Contact Form] general - John Doe

Category: general

Hello, I have a question...
```

---

## 💰 Pricing

**Free Forever:**
- ✅ 250 submissions/month
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File uploads (до 5MB)

Для контактной формы этого более чем достаточно!

---

## 🔧 Локальная разработка

Создай файл `.env.local`:
```bash
NEXT_PUBLIC_WEB3FORMS_KEY=твой_access_key
```

---

## ✅ Готово!

Всё работает без backend, без сложных настроек!

**Нет Resend ✗**  
**Нет API routes ✗**  
**Нет сложных настроек ✗**  
**Просто работает ✓**
