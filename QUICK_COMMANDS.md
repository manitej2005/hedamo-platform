# ⚡ Quick Commands Reference

## 🔄 Development

```bash
# Start development server
npm run dev

# Open browser
http://localhost:8080
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

## 📦 Git Commands

```bash
# Initialize repository
git init

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub (first time)
git remote add origin https://github.com/YOUR_USERNAME/hedamo-platform.git
git branch -M main
git push -u origin main

# Push updates
git push
```

## 🚀 Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls
```

## 📸 Screenshot Checklist

Save these 6 images to `screenshots/` folder:

- [ ] dashboard.png
- [ ] products.png
- [ ] add-product.png
- [ ] analytics.png
- [ ] settings-profile.png
- [ ] settings-security.png

## 🔗 Important URLs

- **Local Dev:** http://localhost:8080
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** (update after creating)
- **Live App:** (update after deploying)

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8080 (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process
```

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Git Issues

```bash
# Undo last commit
git reset --soft HEAD~1

# Discard all changes
git reset --hard HEAD
```

## ✅ Deployment Steps (Quick)

1. **Save Screenshots** → `screenshots/` folder
2. **Commit Everything** → `git add . && git commit -m "Ready for deployment"`
3. **Push to GitHub** → Create repo, then `git push`
4. **Deploy on Vercel** → Import from GitHub
5. **Update README** → Add live URL
6. **Push URL Update** → `git push`

**Done! 🎉**
