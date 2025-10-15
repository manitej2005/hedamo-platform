# 🚀 Deployment Checklist

Use this checklist to ensure everything is ready before deploying to Vercel.

## ✅ Pre-Deployment

- [x] Application runs locally without errors (`npm run dev`)
- [x] Dependencies installed successfully
- [x] README.md updated with project details
- [x] Screenshots folder created
- [ ] Screenshots saved in `/screenshots` folder
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview build works (`npm run preview`)
- [ ] No console errors in browser
- [ ] All pages accessible and functional

## ✅ GitHub Setup

- [ ] Code pushed to GitHub repository
- [ ] Repository is public or you have Vercel access
- [ ] `.gitignore` includes `node_modules`, `dist`, `.env`
- [ ] All screenshots committed to repo

## ✅ Vercel Deployment

- [ ] Signed up for Vercel account
- [ ] Imported project from GitHub
- [ ] Verified build settings:
  - Framework Preset: **Vite**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- [ ] Deployment successful
- [ ] Live URL works and loads correctly

## ✅ Post-Deployment

- [ ] Updated README with live Vercel URL
- [ ] Tested all pages on live site
- [ ] Tested on mobile device or browser dev tools
- [ ] Checked for console errors on live site
- [ ] Shared live URL with others

## 🔗 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Your Repository:** Update this with your GitHub URL
- **Live Application:** Update this after deployment

## 🆘 Common Issues

### Build Fails

```bash
# Check build locally first
npm run build

# Check for TypeScript errors
npm run lint
```

### 404 on Page Refresh

Create `vercel.json` in project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Images Not Loading

Ensure images are in the `public` folder or properly imported.

## 📊 Deployment Status

| Step          | Status     | Date | Notes                |
| ------------- | ---------- | ---- | -------------------- |
| Local Build   | ⏳ Pending | -    | Run `npm run build`  |
| GitHub Push   | ⏳ Pending | -    | Commit and push code |
| Vercel Deploy | ⏳ Pending | -    | Import from GitHub   |
| Live Testing  | ⏳ Pending | -    | Test all features    |
| README Update | ⏳ Pending | -    | Add live URL         |

---

**Legend:**

- ⏳ Pending
- ✅ Complete
- ❌ Failed

**Last Updated:** October 15, 2025
