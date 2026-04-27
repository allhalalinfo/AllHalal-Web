# 🚀 Quick Start: PM2 Deployment

## ⚡ Быстрая настройка за 5 шагов

### 1️⃣ Настройте SSH ключ на сервере

```bash
# Подключитесь к серверу
ssh allhalal@49.12.186.18

# Создайте SSH ключ
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/github_allhalal

# Покажите публичный ключ
cat ~/.ssh/github_allhalal.pub
```

**Скопируйте** весь вывод.

### 2️⃣ Добавьте ключ в GitHub

1. Откройте: https://github.com/allhalalinfo/AllHalal-Web/settings/keys
2. **Add deploy key**
3. Title: `Hetzner Server`
4. Key: вставьте скопированный ключ
5. ✅ Allow write access
6. **Add key**

### 3️⃣ Настройте SSH config на сервере

```bash
# Создайте config
nano ~/.ssh/config
```

Вставьте:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_allhalal
  IdentitiesOnly yes
```

Сохраните и установите права:

```bash
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/github_allhalal

# Тестируйте
ssh -T git@github.com
```

Должно вывести: `Hi allhalalinfo! You've successfully authenticated...` ✅

### 4️⃣ Первый деплой

```bash
cd /home/allhalal/Allhalal-Web

# Клонируйте репозиторий
git clone git@github.com:allhalalinfo/AllHalal-Web.git .

# Настройте .env
cp .env.example .env
nano .env
# Установите: NEXT_PUBLIC_API_URL=https://api.allhalal.info

# Установите и соберите
npm ci --only=production
npm run build

# Запустите
pm2 start ecosystem.config.js
pm2 save

# Проверьте
curl http://localhost:3000/api/health
```

### 5️⃣ Готово! Теперь просто:

```bash
git push origin main
```

GitHub Actions автоматически задеплоит! 🎉

---

## 🔗 Полная документация

См. [PM2_DEPLOYMENT.md](./PM2_DEPLOYMENT.md) для:
- Настройки Nginx + SSL
- Мониторинга и логов
- Troubleshooting
- Продвинутых настроек

---

## 📞 Нужна помощь?

Проверьте статус:
```bash
pm2 status
pm2 logs allhalal-web
```

Деплой через GitHub Actions:
https://github.com/allhalalinfo/AllHalal-Web/actions
