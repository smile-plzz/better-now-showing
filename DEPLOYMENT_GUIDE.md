# Deployment Guide - NowShowing

Complete guide for deploying the NowShowing application to various hosting platforms.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nowshowing)

**Manual Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and set environment variables
```

### 2. Netlify

**One-Click Deploy:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/nowshowing)

**Manual Deploy:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 3. GitHub Pages

```bash
# Add to package.json scripts
"deploy": "gh-pages -d ."

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## 📋 Pre-Deployment Checklist

### ✅ Environment Variables
- [ ] `OMDB_API_KEY` - OMDb API key
- [ ] `GNEWS_API_KEY` - GNews API key  
- [ ] `NODE_ENV=production`

### ✅ API Keys Setup
1. **OMDb API Key**
   - Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
   - Request free API key
   - Add to environment variables

2. **GNews API Key**
   - Visit [GNews](https://gnews.io/)
   - Sign up for free account
   - Get API key
   - Add to environment variables

### ✅ File Verification
- [ ] All source files present
- [ ] `vercel.json` configured
- [ ] `package.json` scripts defined
- [ ] Environment variables set
- [ ] API endpoints working

## 🔧 Platform-Specific Configuration

### Vercel Configuration

**vercel.json:**
```json
{
  "name": "nowshowing-app",
  "version": 2,
  "outputDirectory": ".",
  "buildCommand": "echo 'No build step required for static site'",
  "functions": {
    "api/check-video.js": { "maxDuration": 10 },
    "api/fetch-news.js": { "maxDuration": 10 },
    "api/omdb-proxy.js": { "maxDuration": 10 },
    "api/test.js": { "maxDuration": 5 }
  },
  "env": { "NODE_ENV": "production" }
}
```

**Environment Variables:**
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add: `OMDB_API_KEY`, `GNEWS_API_KEY`, `NODE_ENV=production`

### Netlify Configuration

**netlify.toml:**
```toml
[build]
  publish = "."
  command = "echo 'No build step required'"

[build.environment]
  NODE_ENV = "production"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

### GitHub Pages Configuration

**Create `.github/workflows/deploy.yml`:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: .
```

## 🛠️ Custom Domain Setup

### Vercel Custom Domain
1. Go to Vercel Dashboard → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for propagation (up to 48 hours)

### Netlify Custom Domain
1. Go to Netlify Dashboard → Domain Management
2. Add custom domain
3. Configure DNS settings
4. Enable HTTPS (automatic)

### GitHub Pages Custom Domain
1. Create `CNAME` file in root with your domain
2. Go to Repository Settings → Pages
3. Add custom domain
4. Enable HTTPS

## 🔒 Security Configuration

### SSL/HTTPS
- **Vercel**: Automatic SSL certificates
- **Netlify**: Automatic SSL certificates  
- **GitHub Pages**: Automatic SSL certificates

### Security Headers
All platforms use the security headers defined in `vercel.json`:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## 📊 Performance Optimization

### Caching Strategy
- Static assets: 1 year cache
- API responses: 5-60 minutes cache
- Service worker: Offline caching

### CDN Configuration
- **Vercel**: Global CDN included
- **Netlify**: Global CDN included
- **GitHub Pages**: CDN via Cloudflare

## 🐛 Troubleshooting Deployment

### Common Issues

**Build Failures**
```bash
# Check build logs
vercel logs
netlify logs

# Verify environment variables
echo $OMDB_API_KEY
echo $GNEWS_API_KEY
```

**API Errors**
- Verify API keys are set correctly
- Check API rate limits
- Test API endpoints locally

**CORS Issues**
- Ensure CORS headers are configured
- Check API function responses
- Verify domain configuration

### Debug Commands

**Vercel:**
```bash
# Local development
vercel dev

# Check deployment status
vercel ls

# View logs
vercel logs
```

**Netlify:**
```bash
# Local development
netlify dev

# Check deployment status
netlify status

# View logs
netlify logs
```

## 📈 Monitoring & Analytics

### Performance Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Netlify Analytics**: Built-in analytics
- **Google Analytics**: Add tracking code

### Error Tracking
- **Sentry**: Error monitoring
- **LogRocket**: Session replay
- **Bugsnag**: Error reporting

## 🔄 Continuous Deployment

### GitHub Actions (Vercel)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### GitHub Actions (Netlify)
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: '.'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
```

## 📞 Support

### Platform Support
- **Vercel**: [Vercel Support](https://vercel.com/support)
- **Netlify**: [Netlify Support](https://www.netlify.com/support/)
- **GitHub**: [GitHub Support](https://support.github.com/)

### Community Resources
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Netlify Community](https://community.netlify.com/)
- [GitHub Community](https://github.com/orgs/community/discussions)

---

**Need help?** Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or create an issue on GitHub.
