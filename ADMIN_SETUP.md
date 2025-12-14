# 🔐 Admin Panel Setup

## Overview
Защищённая паролем админ-панель для интеграции с Backend API (FastAPI).

---

## 🚀 Quick Start

### 1. Настрой пароль админа

**Vercel:**
1. Vercel Dashboard → Settings → Environment Variables
2. Добавь:
   ```
   ADMIN_PASSWORD = твой_секретный_пароль
   ```
3. Выбери все окружения (Production, Preview, Development)
4. Save → Redeploy

**Локально (для разработки):**
Создай `.env.local`:
```bash
ADMIN_PASSWORD=твой_секретный_пароль_для_теста
```

---

## 🔧 Настрой Backend CORS

Твой Backend API должен разрешить запросы с сайта.

**В FastAPI (`main.py` или `__init__.py`):**

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://allhalal.info",
        "https://*.vercel.app",  # Preview deployments
        "http://localhost:3000",  # Local development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

---

## 📡 Backend API Configuration

Добавь переменную окружения для Backend URL:

**Vercel:**
```
NEXT_PUBLIC_BACKEND_URL = https://your-backend-api.com
```

**Локально:**
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 🎨 Features

### Current (Phase 1):
- ✅ Password-protected login
- ✅ Secure session cookies (24h expiry)
- ✅ Logout functionality
- ✅ Basic dashboard placeholder

### Coming Soon (Phase 2):
- 📊 Database Statistics (from `/admin/stats/database`)
- 🔄 ETL Monitor (from `/admin/stats/etl`)
- 💚 System Health (from `/admin/health/system`)
- 📈 API Usage Stats (from `/admin/stats/api`)
- ⚙️ Scripts Management
- 📋 TODO List

---

## 🔒 Security Features

1. **Password Protection**
   - Stored in environment variables (never in code)
   - Server-side validation

2. **Session Cookies**
   - HttpOnly (не доступны из JavaScript)
   - Secure (только HTTPS в production)
   - SameSite=Strict (защита от CSRF)
   - 24 часа expiry

3. **No Rate Limiting Yet**
   - TODO: Add rate limiting для защиты от brute force
   - Рекомендую: Cloudflare или Vercel WAF

---

## 📖 Usage

### Access Admin:
1. Go to `https://allhalal.info/admin`
2. Enter password
3. Click "Login"

### Session:
- Автоматический logout через 24 часа
- Или нажми "Logout" в header

### Backend Integration:
Admin панель будет делать запросы к:
```
GET {BACKEND_URL}/admin/stats/database
GET {BACKEND_URL}/admin/stats/etl
GET {BACKEND_URL}/admin/health/system
GET {BACKEND_URL}/admin/stats/api
POST {BACKEND_URL}/admin/scripts/run/{name}
GET {BACKEND_URL}/admin/todos
```

---

## 🧪 Testing

### Local:
```bash
# 1. Set password
echo "ADMIN_PASSWORD=test123" > .env.local

# 2. Start dev server
npm run dev

# 3. Open browser
open http://localhost:3000/admin

# 4. Login with "test123"
```

### Production:
1. Deploy to Vercel
2. Add ADMIN_PASSWORD to env vars
3. Redeploy
4. Go to https://allhalal.info/admin
5. Login

---

## 🚨 Important Notes

⚠️ **Never commit passwords to git!**

⚠️ **ADMIN_PASSWORD должен быть сильным:**
- Минимум 12 символов
- Буквы, цифры, символы
- Не используй простые пароли типа "admin123"

⚠️ **Backend должен быть защищён:**
- Используй HTTPS
- Добавь rate limiting
- Логируй все admin действия

---

## 🔄 Next Steps

1. ✅ Set ADMIN_PASSWORD in Vercel
2. ⏳ Configure Backend CORS
3. ⏳ Add NEXT_PUBLIC_BACKEND_URL
4. ⏳ Phase 2: Implement dashboard tabs
5. ⏳ Phase 3: Add Charts.js visualizations

---

## 🆘 Troubleshooting

### Can't login:
- Check ADMIN_PASSWORD is set in Vercel
- Check you redeployed after adding env var
- Try hard refresh (Cmd+Shift+R)

### CORS errors:
- Check Backend has CORSMiddleware configured
- Check allow_origins includes your domain
- Check Browser console for exact error

### Session expires too fast:
- Default is 24 hours
- Check cookie settings in login route
- Check browser is accepting cookies

---

Ready to go! 🚀
