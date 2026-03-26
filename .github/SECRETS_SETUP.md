# GitHub Actions Secrets Setup

This project uses GitHub Actions to automatically submit URLs to IndexNow after each deployment.

## Required Secrets

Add the following secret to your GitHub repository:

### INDEXNOW_API_SECRET

**Path**: Repository → Settings → Secrets and variables → Actions → New repository secret

**Name**: `INDEXNOW_API_SECRET`  
**Value**: `my-allhalal-indexnow-secret-2026`

(This is the same secret you added to Vercel environment variables)

## How to Add Secrets

1. Go to: https://github.com/allhalalinfo/AllHalal-Web/settings/secrets/actions
2. Click "New repository secret"
3. Name: `INDEXNOW_API_SECRET`
4. Value: `my-allhalal-indexnow-secret-2026`
5. Click "Add secret"

## Workflow Overview

**File**: `.github/workflows/indexnow-submit.yml`

**Triggers**:
- Automatically on every push to `main` branch
- Manually via "Actions" tab → "IndexNow - Auto Submit After Deploy" → "Run workflow"

**Steps**:
1. Waits 90 seconds for Vercel deployment to complete
2. Calls `/api/index-now` endpoint with authentication
3. Submits all halal item pages to Google, Bing, Yandex
4. Reports success/failure

**Expected Output**:
```
✅ Successfully submitted URLs to search engines!
📈 Submitted 117 URLs in 2 batches
```

## Testing

After adding the secret, you can:

1. **Automatic test**: Make any commit and push to `main`
   ```bash
   git commit --allow-empty -m "Test IndexNow workflow"
   git push origin main
   ```

2. **Manual test**: 
   - Go to: https://github.com/allhalalinfo/AllHalal-Web/actions
   - Select "IndexNow - Auto Submit After Deploy"
   - Click "Run workflow"

## Monitoring

Check workflow runs:
https://github.com/allhalalinfo/AllHalal-Web/actions

Each run will show:
- ⏳ Wait time for deployment
- 🚀 Submission status
- 📊 Response from IndexNow API
- ✅ Success/failure status

## Troubleshooting

**Error: "Unauthorized"**
- Make sure `INDEXNOW_API_SECRET` is set in GitHub Secrets
- Verify the secret value matches Vercel environment variable

**Error: "HTTP Status: 500"**
- Check Vercel logs for API errors
- Verify `INDEXNOW_KEY` is set in Vercel environment variables

**No URLs submitted**
- Wait longer (increase sleep time in workflow)
- Check if Vercel deployment was successful
- Verify API endpoint is accessible: https://allhalal.info/api/index-now
