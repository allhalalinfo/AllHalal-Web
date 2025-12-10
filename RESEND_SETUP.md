# 📧 Resend Email Setup Instructions

## Overview
The contact form uses [Resend](https://resend.com) to send emails from the website.

---

## Setup Steps

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email

### 2. Add & Verify Domain
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `allhalal.info`
4. Add the DNS records Resend provides to your domain:
   - **SPF record** (TXT)
   - **DKIM record** (TXT)
   - **DMARC record** (TXT)
5. Wait for verification (usually 5-10 minutes)

### 3. Create API Key
1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name it: `AllHalal Website Production`
4. Select **Full Access** (or **Sending access** minimum)
5. **Copy the API key** (starts with `re_...`)

### 4. Local Development
Create a file `.env.local` in project root:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

### 5. Vercel Deployment
1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project (`AllHalal-Web`)
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_actual_api_key_here`
   - **Environments:** ✅ Production ✅ Preview ✅ Development
5. Click **Save**
6. **Redeploy** your project

---

## Email Configuration

**From address:**
```
AllHalal Website <noreply@allhalal.info>
```

**To address:**
```
app@allhalal.info
```

**Reply-To:**
User's email from the form

---

## Testing

### Test locally:
```bash
npm run dev
```
Go to `http://localhost:3000/contact` and submit the form.

### Check Resend logs:
1. Go to Resend dashboard → **Logs**
2. You'll see all sent emails with delivery status

---

## Pricing

**Free tier includes:**
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ Custom domain
- ✅ Email logs

Perfect for contact form usage. Upgrade if you need more.

---

## Troubleshooting

### Error: "Missing RESEND_API_KEY"
- Make sure `.env.local` exists with the API key
- For Vercel: Check Environment Variables in settings

### Error: "Failed to send email"
- Check if domain is verified in Resend
- Check API key is valid (not expired or deleted)
- Check Resend logs for detailed error

### Emails not arriving
- Check spam folder
- Verify `app@allhalal.info` is correct
- Check Resend logs for delivery status

---

## Security Notes

⚠️ **Never commit `.env.local` to git!**

✅ API key is only used server-side (Vercel Function)

✅ No sensitive data exposed to client

✅ Rate limiting handled by Resend
