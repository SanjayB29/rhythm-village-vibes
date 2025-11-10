# GitHub Pages Deployment Guide

## Prerequisites
- GitHub account with access to the repository
- Git configured with your credentials

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Authenticate with GitHub** (if not already done):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. **Push changes to main branch**:
   ```bash
   git push origin main
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

   This will:
   - Build the project (`npm run build`)
   - Deploy the `dist` folder to the `gh-pages` branch
   - Automatically push to GitHub

### Option 2: Manual Deployment

If you encounter authentication issues:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Go to GitHub repository settings**:
   - Navigate to: https://github.com/SanjayB29/rhythm-village-vibes/settings/pages
   - Under "Source", select "Deploy from a branch"
   - Select branch: `gh-pages`
   - Select folder: `/ (root)`
   - Click "Save"

3. **Manually push to gh-pages branch**:
   ```bash
   git checkout -b gh-pages
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

### Option 3: GitHub Actions (Automated CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## After Deployment

Your site will be available at:
**https://sanjayb29.github.io/rhythm-village-vibes/**

## Troubleshooting

### Authentication Issues
If you get authentication errors:
1. Use SSH instead of HTTPS:
   ```bash
   git remote set-url origin git@github.com:SanjayB29/rhythm-village-vibes.git
   ```
2. Or use a Personal Access Token (PAT):
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` scope
   - Use it as your password when prompted

### Build Errors
- Clear cache: `rm -rf node_modules dist && npm install`
- Check Node version: `node --version` (should be 18+)

### 404 Errors
- Ensure `base` in `vite.config.ts` matches your repository name
- Wait 2-3 minutes after deployment for GitHub Pages to update

## Configuration Files

### vite.config.ts
```typescript
base: '/rhythm-village-vibes/'
```

### package.json
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## Features Deployed

✅ Dynamic navbar with adaptive color contrast
✅ WCAG AA compliant (4.5:1 contrast ratio)
✅ Real-time background detection
✅ Automatic font weight adjustment
✅ Dynamic text shadows for visibility
✅ Smooth transitions (500ms)
✅ Mobile responsive
✅ Inter font family