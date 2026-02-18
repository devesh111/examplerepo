# Video Player Application

A modern, feature-rich video player built with **Next.js**, **video.js**, and **shadcn/ui**. This application provides an elegant modal-based video player with advanced playback controls including speed adjustment and resolution selection.

## 🎯 Features

### ✨ Core Features
- **Modal Video Player**: Beautiful modal dialog for video playback
- **Playback Speed Control**: Switch between 0.5x, 1x, 1.5x, and 2x playback speeds
- **Resolution Selection**: Choose from multiple video quality options (Auto, 1080p, 720p, 480p, 360p)
- **HLS Stream Support**: Full support for m3u8 streaming format
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI**: Built with shadcn/ui components and Tailwind CSS v4

### 🎬 Video Player Features
- Full video.js integration with custom controls
- Play/Pause controls
- Progress bar with seek functionality
- Volume control
- Fullscreen mode
- Loading indicators
- Error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Video Player**: video.js
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Package Manager**: npm

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd video-player
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## 🚀 Usage

### Basic Usage

1. Click the **"Start Playing Video"** button on the home page
2. The video player modal will open
3. Use the controls to:
   - **Adjust Speed**: Click speed buttons (0.5x, 1x, 1.5x, 2x)
   - **Change Resolution**: Select quality from the dropdown (Auto, 1080p, 720p, 480p, 360p)
   - **Close Player**: Click the "Close" button to close the modal

### Changing the Video URL

To use a different video URL, edit the `VIDEO_URL` constant in `app/page.tsx`:

```typescript
const VIDEO_URL = 'https://your-video-url.m3u8'
```

The application supports:
- **HLS Streams** (.m3u8 format) - Recommended
- **MP4 Videos** (with type adjustment)
- **Other streaming formats** (with appropriate MIME type)

## 📁 Project Structure

```
video-player/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page with modal and button
│   └── globals.css          # Global styles and video.js customization
├── components/
│   ├── EnhancedVideoPlayer.tsx  # Main video player component
│   ├── VideoPlayer.tsx          # Alternative video player component
│   └── ui/                      # shadcn/ui components
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## 🎨 Customization

### Styling

The application uses Tailwind CSS v4 for styling. Customize colors and styles in:
- `app/globals.css` - Global styles and video.js customization
- Component files - Individual component styling

### Video Player Controls

Modify playback speeds in `components/EnhancedVideoPlayer.tsx`:

```typescript
const playbackRates = [0.5, 1, 1.5, 2]
```

Modify available resolutions:

```typescript
const resolutions = [
  { label: 'Auto', value: 'auto' },
  { label: '1080p', value: '1080' },
  { label: '720p', value: '720' },
  { label: '480p', value: '480' },
  { label: '360p', value: '360' },
]
```

### Modal Styling

Customize the modal appearance in `app/page.tsx`:

```typescript
<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="max-w-4xl w-full h-[600px] p-0 bg-black border-slate-700">
    {/* Video player content */}
  </DialogContent>
</Dialog>
```

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The application uses the video URL directly in the code.

For production, consider moving the video URL to environment variables:

```bash
# .env.local
NEXT_PUBLIC_VIDEO_URL=https://your-video-url.m3u8
```

Then update `app/page.tsx`:

```typescript
const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL || 'https://...'
```

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Video player controls automatically adjust for smaller screens.

## 🐛 Troubleshooting

### Video Not Playing

1. **Check the video URL**: Ensure the URL is correct and accessible
2. **CORS Issues**: If using a different domain, ensure CORS headers are properly configured
3. **Browser Console**: Open DevTools (F12) and check for error messages
4. **HLS Support**: Ensure your browser supports HLS streaming (most modern browsers do)

### Controls Not Working

1. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check Console**: Look for JavaScript errors in the browser console
3. **Verify Dependencies**: Run `npm install` to ensure all packages are installed

### Modal Not Opening

1. **Check JavaScript**: Ensure JavaScript is enabled in your browser
2. **Console Errors**: Check browser console for any errors
3. **React State**: Verify the modal state is being managed correctly

## 📚 API Reference

### EnhancedVideoPlayer Component

```typescript
interface EnhancedVideoPlayerProps {
  videoUrl: string    // URL of the video stream (m3u8 format)
  onClose?: () => void // Callback when player should close
}
```

### Usage Example

```typescript
import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'

export default function MyComponent() {
  return (
    <EnhancedVideoPlayer
      videoUrl="https://example.com/video.m3u8"
      onClose={() => console.log('Player closed')}
    />
  )
}
```

## 🎓 Learning Resources

- [video.js Documentation](https://docs.videojs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HLS Streaming Guide](https://en.wikipedia.org/wiki/HTTP_Live_Streaming)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues, questions, or suggestions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Check the video.js documentation for player-specific issues

## 🔄 Updates & Maintenance

To keep the project up to date:

```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit
```

---

**Built with ❤️ using Next.js, video.js, and shadcn/ui**
