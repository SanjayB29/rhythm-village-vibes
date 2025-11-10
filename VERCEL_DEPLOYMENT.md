# Vercel Deployment Guide

## Quick Deployment (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest - No CLI needed!)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with GitHub, GitLab, or Bitbucket

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose: `SanjayB29/rhythm-village-vibes`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
   - Install Command: `npm install` (auto-filled)
   - Click "Deploy"

4. **Done!** 🎉
   - Your site will be live in 1-2 minutes
   - You'll get a URL like: `https://rhythm-village-vibes.vercel.app`
   - Every push to main branch auto-deploys

### Option 2: Deploy via Vercel CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```
   - Enter your email
   - Click the verification link sent to your email

2. **Deploy to Production**
   ```bash
   vercel --prod
   ```
   - Follow the prompts:
     - Set up and deploy? **Y**
     - Which scope? Select your account
     - Link to existing project? **N**
     - Project name? `rhythm-village-vibes` (or press Enter)
     - Directory? `./` (press Enter)
     - Override settings? **N**

3. **Your site is live!**
   - URL will be displayed in terminal
   - Example: `https://rhythm-village-vibes.vercel.app`

### Option 3: Deploy via GitHub Integration (Automated)

1. **Connect Vercel to GitHub**
   - Go to: https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub

2. **Select Repository**
   - Find `rhythm-village-vibes`
   - Click "Import"

3. **Auto-Deploy Setup**
   - Vercel automatically detects Vite
   - Click "Deploy"
   - Every push to `main` branch will auto-deploy!

## Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### vite.config.ts
```typescript
// No base path needed for Vercel (already configured)
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

## Environment Variables (if needed)

If you need to add environment variables:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add your variables:
   - Name: `VITE_API_URL`
   - Value: `https://api.example.com`
   - Environment: Production, Preview, Development

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Features Deployed

✅ Dynamic navbar with adaptive color contrast
✅ WCAG AA compliant (4.5:1 contrast ratio)
✅ Real-time background detection
✅ Automatic font weight adjustment (500-800)
✅ Dynamic text shadows for visibility
✅ Smooth 500ms transitions
✅ Mobile responsive
✅ Inter font family
✅ Optimized production build

## Deployment URLs

After deployment, you'll get:
- **Production**: `https://rhythm-village-vibes.vercel.app`
- **Preview**: Unique URL for each branch/PR
- **Development**: Local development server

## Automatic Deployments

Once connected to GitHub:
- **Push to main** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally
rm -rf node_modules dist .vercel
npm install
npm run build
```

### Environment Issues
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs in Vercel Dashboard

### 404 Errors
- Ensure `vercel.json` has the rewrite rule
- Check that `dist` folder is being generated
- Verify `index.html` exists in dist

## CLI Commands Reference

```bash
# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]

# Link to existing project
vercel link

# Pull environment variables
vercel env pull
```

## Next Steps After Deployment

1. ✅ Visit your live site
2. ✅ Test all features (navbar, responsive design, etc.)
3. ✅ Share your URL!
4. ✅ Set up custom domain (optional)
5. ✅ Enable analytics in Vercel Dashboard

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- GitHub Issues: Create an issue in your repository

---

**Recommended**: Use Option 1 (Vercel Dashboard) - it's the easiest and most reliable method!