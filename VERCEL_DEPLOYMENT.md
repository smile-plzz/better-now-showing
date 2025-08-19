# Vercel Deployment Guide

## 🚀 Quick Deploy

### Option 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables
5. Deploy!

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## ⚙️ Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Set `OMDB_API_KEY` in Vercel dashboard
- [ ] Set `GNEWS_API_KEY` in Vercel dashboard
- [ ] Set `NODE_ENV=production`

### 2. API Endpoints
- [ ] `/api/test` - Health check
- [ ] `/api/check-video` - Video availability
- [ ] `/api/fetch-news` - News data
- [ ] `/api/omdb-proxy` - Movie data

### 3. Static Files
- [ ] `index.html` - Main page
- [ ] `style.css` - Styles
- [ ] `app.js` - Frontend logic
- [ ] `service-worker.js` - PWA support
- [ ] `manifest.webmanifest` - App manifest

## 🔧 Configuration Files

### vercel.json
- Optimized for serverless functions
- Proper caching headers
- CORS configuration
- Function timeouts

### package.json
- ES modules support
- Vercel build scripts
- Node.js version requirements

## 📱 Performance Optimizations

### Caching Strategy
- **Static assets**: 1 year cache
- **API responses**: 5-60 minutes cache
- **Service worker**: No cache
- **HTML**: 1 year cache

### Function Optimization
- **Max duration**: 10 seconds for APIs
- **Memory**: Optimized for serverless
- **Cold starts**: Minimized with proper imports

## 🚨 Common Issues & Solutions

### Issue: API Keys Not Working
**Solution**: Check environment variables in Vercel dashboard

### Issue: CORS Errors
**Solution**: CORS headers are already configured in APIs

### Issue: Function Timeouts
**Solution**: Functions are configured with 10-second limits

### Issue: Build Failures
**Solution**: No build step required - static site deployment

## 📊 Monitoring & Analytics

### Vercel Analytics
- Function execution times
- Error rates
- Performance metrics
- Usage statistics

### Custom Monitoring
- API response times
- Cache hit rates
- User experience metrics

## 🔄 Continuous Deployment

### GitHub Integration
- Automatic deployments on push
- Preview deployments on PRs
- Production deployment on merge

### Environment Management
- Development: Local testing
- Preview: PR testing
- Production: Live site

## 🛡️ Security Features

### Built-in Security
- HTTPS by default
- DDoS protection
- Edge network security
- Environment variable encryption

### Additional Security
- Content Security Policy
- XSS protection
- CSRF protection
- Secure headers

## 📈 Scaling

### Automatic Scaling
- Serverless functions scale automatically
- Edge network distribution
- Global CDN
- Load balancing

### Performance Limits
- **Free tier**: 100GB bandwidth/month
- **Pro tier**: 1TB bandwidth/month
- **Enterprise**: Custom limits

## 🔍 Troubleshooting

### Debug Mode
```bash
# Enable debug logging
vercel --debug

# View function logs
vercel logs
```

### Common Commands
```bash
# List deployments
vercel ls

# View project info
vercel inspect

# Remove project
vercel remove
```

## 📞 Support

### Vercel Support
- [Documentation](https://vercel.com/docs)
- [Community](https://github.com/vercel/vercel/discussions)
- [Support](https://vercel.com/support)

### Project Support
- Check `SITE_STATUS.md` for current status
- Review `TROUBLESHOOTING.md` for common issues
- Contact developer for specific problems

---

**Ready to deploy?** Follow the checklist above and deploy to Vercel!
