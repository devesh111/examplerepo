# Setup & Deployment Guide

Complete guide for setting up, running, and deploying the Video Player application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:3000`

## 📋 Project Structure Explained

### `/app` Directory (Next.js App Router)
- **layout.tsx**: Root layout component with metadata and global providers
- **page.tsx**: Home page with "Start Playing Video" button and modal
- **globals.css**: Global styles, Tailwind configuration, and video.js customization

### `/components` Directory
- **EnhancedVideoPlayer.tsx**: Main video player component with custom controls
  - Playback speed selection (0.5x, 1x, 1.5x, 2x)
  - Resolution/quality dropdown
  - Close button for modal integration
  - HLS stream support

- **VideoPlayer.tsx**: Alternative video player component (basic implementation)

- **ui/**: shadcn/ui pre-built components
  - Button, Dialog, Card, etc.

### `/lib` Directory
- **utils.ts**: Utility functions (cn() for className merging)

### `/public` Directory
- Static assets (images, icons, etc.)

## 🔧 Configuration

### Video URL Configuration

**Option 1: Direct in Code** (Current Implementation)
```typescript
// app/page.tsx
const VIDEO_URL = 'https://vz-7335a46e-2e0.b-cdn.net/594c2931-3911-4bc3-a7ee-a085f5050931/playlist.m3u8'
```

**Option 2: Environment Variables** (Recommended for Production)

Create `.env.local`:
```bash
NEXT_PUBLIC_VIDEO_URL=https://your-video-url.m3u8
```

Update `app/page.tsx`:
```typescript
const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL || 'https://default-url.m3u8'
```

### Playback Speed Configuration

Edit `components/EnhancedVideoPlayer.tsx`:
```typescript
// Available playback speeds for the player
const playbackRates = [0.5, 1, 1.5, 2]
```

### Resolution Configuration

Edit `components/EnhancedVideoPlayer.tsx`:
```typescript
// Available resolutions - these would be detected from HLS manifest in production
const resolutions = [
  { label: 'Auto', value: 'auto' },
  { label: '1080p', value: '1080' },
  { label: '720p', value: '720' },
  { label: '480p', value: '480' },
  { label: '360p', value: '360' },
]
```

## 🎨 Styling Customization

### Tailwind CSS Configuration
- Located in `tailwind.config.ts`
- Uses Tailwind CSS v4
- Includes shadcn/ui theme variables

### Video.js Custom Styling
All video.js styling is in `app/globals.css`:
- Control bar appearance
- Button styling
- Progress bar colors
- Responsive adjustments

### Color Scheme
- **Primary**: Blue (#2563eb)
- **Background**: Dark slate (#0f172a)
- **Text**: White (#ffffff)
- **Accent**: Gray (#374151)

To change colors, update the CSS variables in `app/globals.css`:
```css
.video-js .vjs-play-progress {
  background-color: #2563eb; /* Change primary color */
}
```

## 📦 Dependencies

### Core Dependencies
- **next**: ^15.0.0 - React framework
- **react**: ^19.0.0 - UI library
- **react-dom**: ^19.0.0 - React DOM
- **video.js**: ^8.x.x - Video player library
- **tailwindcss**: ^4.0.0 - CSS framework
- **shadcn/ui**: Pre-installed components

### Development Dependencies
- **typescript**: ^5.x.x - Type safety
- **eslint**: Code linting
- **postcss**: CSS processing

### Adding New Dependencies
```bash
npm install package-name
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Modal opens when clicking "Start Playing Video"
- [ ] Video loads and plays
- [ ] Playback speed buttons work (0.5x, 1x, 1.5x, 2x)
- [ ] Resolution dropdown works
- [ ] Close button closes modal
- [ ] Responsive on mobile (< 640px)
- [ ] Responsive on tablet (640px - 1024px)
- [ ] Responsive on desktop (> 1024px)
- [ ] No console errors
- [ ] Video controls are accessible

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Environment Variables** (if using .env):
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_VIDEO_URL` with your video URL

### Deploy to Other Platforms

**Netlify**:
```bash
npm run build
# Deploy the .next folder
```

**Docker**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**AWS Amplify**:
1. Connect GitHub repository
2. Build settings: `npm run build`
3. Deploy

## 🔒 Security Considerations

### CORS Configuration
If your video URL is on a different domain, ensure CORS headers are set:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
```

### Content Security Policy
Add to `next.config.ts` if needed:
```typescript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; media-src 'self' https:;"
  }
]
```

### API Keys
Never commit API keys or sensitive data:
- Use `.env.local` for local development
- Use environment variables in production
- Add `.env.local` to `.gitignore` (already done)

## 📊 Performance Optimization

### Image Optimization
- Use Next.js `<Image>` component for images
- Automatically optimizes and serves responsive images

### Code Splitting
- Next.js automatically code-splits at the page level
- Dynamic imports for heavy components:
  ```typescript
  const VideoPlayer = dynamic(() => import('@/components/EnhancedVideoPlayer'), {
    loading: () => <p>Loading...</p>
  })
  ```

### Caching
- Static assets cached by browser
- API responses can be cached with `revalidate`

### Video Optimization
- Use HLS format for adaptive bitrate streaming
- Provide multiple quality options
- Enable browser caching for video segments

## 🐛 Debugging

### Enable Debug Mode
```bash
DEBUG=* npm run dev
```

### Browser DevTools
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Check Application tab for storage

### Video.js Debugging
```typescript
// In EnhancedVideoPlayer.tsx
player.on('error', () => {
  const error = player.error()
  console.error('Video player error:', error)
})
```

### Common Issues

**Video not loading**:
- Check video URL is correct
- Verify CORS headers
- Check browser console for errors

**Controls not responding**:
- Clear browser cache
- Check for JavaScript errors
- Verify video.js is loaded

**Modal not opening**:
- Check React state management
- Verify Dialog component is imported
- Check for JavaScript errors

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [video.js Docs](https://docs.videojs.com/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Video Streaming
- [HLS Specification](https://tools.ietf.org/html/rfc8216)
- [DASH vs HLS](https://www.dacast.com/blog/dash-vs-hls/)
- [Video Encoding Guide](https://www.dacast.com/blog/video-encoding/)

### Performance
- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/learn/seo/web-performance)

## 🔄 Maintenance

### Regular Updates
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest major versions
npm install -g npm-check-updates
ncu -u
npm install
```

### Security Audits
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor performance (Vercel Analytics, Google Analytics)
- Track user interactions

## 📞 Support & Troubleshooting

### Getting Help
1. Check the README.md for common issues
2. Review browser console for error messages
3. Check video.js documentation
4. Search GitHub issues for similar problems

### Reporting Issues
When reporting issues, include:
- Browser and version
- Error message from console
- Steps to reproduce
- Expected vs actual behavior

---

**Last Updated**: February 2026
**Version**: 1.0.0
