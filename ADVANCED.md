# Advanced Usage & Customization Guide

This guide covers advanced features, customization options, and integration patterns for the Video Player application.

## 🎯 Advanced Features

### 1. Custom Event Handling

Listen to video player events:

```typescript
// components/EnhancedVideoPlayer.tsx
useEffect(() => {
  if (playerRef.current) {
    const player = playerRef.current

    // Play event
    player.on('play', () => {
      console.log('Video started playing')
    })

    // Pause event
    player.on('pause', () => {
      console.log('Video paused')
    })

    // Time update event
    player.on('timeupdate', () => {
      const currentTime = player.currentTime()
      const duration = player.duration()
      console.log(`Current: ${currentTime}s / Total: ${duration}s`)
    })

    // Ended event
    player.on('ended', () => {
      console.log('Video finished')
    })

    // Error event
    player.on('error', () => {
      const error = player.error()
      console.error('Player error:', error)
    })
  }
}, [])
```

### 2. Programmatic Control

Control the player from outside the component:

```typescript
// Get player reference
const playerRef = useRef<Player | null>(null)

// Play
playerRef.current?.play()

// Pause
playerRef.current?.pause()

// Seek to time (in seconds)
playerRef.current?.currentTime(30)

// Set volume (0-1)
playerRef.current?.volume(0.5)

// Get current time
const currentTime = playerRef.current?.currentTime()

// Get duration
const duration = playerRef.current?.duration()

// Set playback rate
playerRef.current?.playbackRate(1.5)

// Enter fullscreen
playerRef.current?.requestFullscreen()

// Exit fullscreen
document.exitFullscreen()
```

### 3. Dynamic Video Source Switching

Switch between multiple video sources:

```typescript
interface VideoSource {
  src: string
  type: string
  label: string
}

const videoSources: VideoSource[] = [
  {
    src: 'https://example.com/video1.m3u8',
    type: 'application/x-mpegURL',
    label: 'Video 1'
  },
  {
    src: 'https://example.com/video2.m3u8',
    type: 'application/x-mpegURL',
    label: 'Video 2'
  }
]

const switchVideo = (source: VideoSource) => {
  if (playerRef.current) {
    playerRef.current.src({
      src: source.src,
      type: source.type
    })
    playerRef.current.play()
  }
}
```

### 4. Analytics Integration

Track video player events for analytics:

```typescript
// Track video plays
player.on('play', () => {
  // Send to analytics
  gtag.event('video_play', {
    video_title: 'My Video',
    video_url: videoUrl
  })
})

// Track video completion
player.on('ended', () => {
  gtag.event('video_complete', {
    video_title: 'My Video',
    watch_time: player.currentTime()
  })
})

// Track quality changes
const handleResolutionChange = (resolution: string) => {
  gtag.event('video_quality_change', {
    quality: resolution
  })
}
```

### 5. Subtitle/Caption Support

Add subtitle support to the player:

```typescript
interface Subtitle {
  src: string
  srclang: string
  label: string
}

const subtitles: Subtitle[] = [
  {
    src: 'https://example.com/en.vtt',
    srclang: 'en',
    label: 'English'
  },
  {
    src: 'https://example.com/es.vtt',
    srclang: 'es',
    label: 'Spanish'
  }
]

// In video element
<video ref={videoRef} className="video-js">
  {subtitles.map((sub) => (
    <track
      key={sub.srclang}
      kind="captions"
      src={sub.src}
      srcLang={sub.srclang}
      label={sub.label}
    />
  ))}
</video>
```

### 6. Adaptive Bitrate Streaming (HLS)

Configure HLS-specific options:

```typescript
const player = videojs(videoRef.current, {
  html5: {
    hls: {
      // Enable native HLS if available
      overrideNative: true,
      // Bandwidth limit (bits per second)
      bandwidth: 5000000,
      // Enable playlist reload
      enableLowInitialPlaylist: true,
      // Segment timeout
      segmentTimeout: 10000,
      // Maximum segment duration
      maxPlaylistRetries: 3
    }
  }
})
```

## 🎨 Styling Customization

### 1. Custom Theme Colors

Update `app/globals.css`:

```css
/* Change primary color */
.video-js .vjs-play-progress {
  background-color: #ff6b6b; /* Red instead of blue */
}

.video-js .vjs-big-play-button {
  background-color: rgba(255, 107, 107, 0.8);
}

.video-js .vjs-big-play-button:hover {
  background-color: rgba(255, 107, 107, 1);
}

/* Change control bar background */
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.9);
}

/* Change button hover color */
.video-js .vjs-control-bar .vjs-button:hover {
  background-color: rgba(255, 107, 107, 0.3);
}
```

### 2. Custom Control Bar Layout

Customize which controls appear:

```typescript
const player = videojs(videoRef.current, {
  controlBar: {
    // Show only specific controls
    children: [
      'playToggle',
      'currentTimeDisplay',
      'timeDivider',
      'durationDisplay',
      'progressControl',
      'volumePanel',
      'fullscreenToggle'
      // Exclude: 'subtitlesButton', 'captionsButton'
    ]
  }
})
```

### 3. Dark Mode Support

Add dark mode support:

```typescript
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Update CSS for dark mode:

```css
.dark .video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.95);
}

.dark .video-js .vjs-menu {
  background-color: rgba(20, 20, 20, 0.95);
}
```

## 🔌 Integration Patterns

### 1. Integration with Next.js API Routes

Create an API endpoint for video metadata:

```typescript
// app/api/videos/[id]/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Fetch video metadata from database
  const video = await getVideoFromDatabase(params.id)

  return NextResponse.json({
    id: video.id,
    title: video.title,
    url: video.streamUrl,
    duration: video.duration,
    thumbnail: video.thumbnailUrl,
    subtitles: video.subtitles
  })
}
```

### 2. Integration with Database (Prisma)

Store video metadata:

```prisma
// prisma/schema.prisma
model Video {
  id        String   @id @default(cuid())
  title     String
  streamUrl String
  duration  Int
  thumbnail String?
  subtitles Subtitle[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Subtitle {
  id      String @id @default(cuid())
  videoId String
  video   Video  @relation(fields: [videoId], references: [id])
  url     String
  lang    String
  label   String
}
```

### 3. Integration with Authentication

Protect video access:

```typescript
// app/api/videos/[id]/stream/route.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check user has access to video
  const hasAccess = await checkUserVideoAccess(session.user.id, params.id)
  if (!hasAccess) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Return video stream
  const video = await getVideo(params.id)
  return NextResponse.json({ url: video.streamUrl })
}
```

### 4. Integration with CDN

Use CDN for video delivery:

```typescript
// Cloudflare Stream
const VIDEO_URL = 'https://customer-xxxxx.cloudflarestream.com/xxxxx/manifest/video.m3u8'

// AWS CloudFront
const VIDEO_URL = 'https://d123.cloudfront.net/video.m3u8'

// Bunny CDN
const VIDEO_URL = 'https://vz-xxxxx.b-cdn.net/video/playlist.m3u8'
```

## 📊 Advanced Features

### 1. Video Analytics Dashboard

Create a dashboard to track video metrics:

```typescript
// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface VideoMetrics {
  totalViews: number
  averageWatchTime: number
  completionRate: number
  qualityDistribution: Record<string, number>
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<VideoMetrics | null>(null)

  useEffect(() => {
    // Fetch metrics from API
    fetch('/api/analytics/videos')
      .then(res => res.json())
      .then(data => setMetrics(data))
  }, [])

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <h3>Total Views</h3>
        <p className="text-3xl font-bold">{metrics?.totalViews}</p>
      </Card>
      <Card>
        <h3>Avg Watch Time</h3>
        <p className="text-3xl font-bold">{metrics?.averageWatchTime}s</p>
      </Card>
      <Card>
        <h3>Completion Rate</h3>
        <p className="text-3xl font-bold">{metrics?.completionRate}%</p>
      </Card>
    </div>
  )
}
```

### 2. Playlist Support

Create a playlist feature:

```typescript
interface Playlist {
  id: string
  title: string
  videos: Video[]
}

export function PlaylistPlayer({ playlist }: { playlist: Playlist }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentVideo = playlist.videos[currentIndex]

  const playNext = () => {
    if (currentIndex < playlist.videos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div>
      <EnhancedVideoPlayer
        videoUrl={currentVideo.url}
        onClose={() => {}}
      />
      <div className="mt-4">
        <h3>{currentVideo.title}</h3>
        <button onClick={playNext}>Play Next</button>
      </div>
    </div>
  )
}
```

### 3. Picture-in-Picture Mode

Enable PiP mode:

```typescript
const enablePictureInPicture = async () => {
  try {
    if (videoRef.current) {
      await videoRef.current.requestPictureInPicture()
    }
  } catch (error) {
    console.error('PiP not supported:', error)
  }
}

// Add button to controls
<button onClick={enablePictureInPicture}>
  Picture in Picture
</button>
```

### 4. Keyboard Shortcuts

Add keyboard controls:

```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (!playerRef.current) return

    switch (e.key) {
      case ' ':
        e.preventDefault()
        playerRef.current.paused()
          ? playerRef.current.play()
          : playerRef.current.pause()
        break
      case 'f':
        playerRef.current.requestFullscreen()
        break
      case 'm':
        playerRef.current.muted(!playerRef.current.muted())
        break
      case 'ArrowRight':
        playerRef.current.currentTime(playerRef.current.currentTime() + 5)
        break
      case 'ArrowLeft':
        playerRef.current.currentTime(playerRef.current.currentTime() - 5)
        break
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [])
```

## 🔐 Security Best Practices

### 1. Token-Based Access

Implement token-based video access:

```typescript
// Generate signed URL
const generateSignedUrl = (videoId: string, expiresIn: number) => {
  const token = jwt.sign(
    { videoId, exp: Date.now() + expiresIn },
    process.env.JWT_SECRET
  )
  return `${VIDEO_BASE_URL}/${videoId}?token=${token}`
}

// Verify token in API
const verifyVideoToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}
```

### 2. Rate Limiting

Prevent abuse:

```typescript
// app/api/videos/[id]/stream/route.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h')
})

export async function GET(request: Request) {
  const { success } = await ratelimit.limit(request.ip || 'anonymous')
  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 })
  }
  // ... rest of handler
}
```

### 3. Content Security Policy

Add CSP headers:

```typescript
// next.config.ts
export default {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; media-src 'self' https: blob:;"
          }
        ]
      }
    ]
  }
}
```

## 📈 Performance Optimization

### 1. Lazy Loading

Load player only when needed:

```typescript
import dynamic from 'next/dynamic'

const EnhancedVideoPlayer = dynamic(
  () => import('@/components/EnhancedVideoPlayer'),
  {
    loading: () => <div>Loading player...</div>,
    ssr: false // Don't render on server
  }
)
```

### 2. Preload Video

Preload video metadata:

```typescript
<link rel="preload" as="video" href="https://example.com/video.m3u8" />
```

### 3. Optimize Video Encoding

Use efficient video codecs:
- **H.264** for broad compatibility
- **H.265** for better compression
- **VP9** for open-source option

## 🧪 Testing

### Unit Tests

```typescript
// __tests__/EnhancedVideoPlayer.test.tsx
import { render, screen } from '@testing-library/react'
import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'

describe('EnhancedVideoPlayer', () => {
  it('renders video player', () => {
    render(<EnhancedVideoPlayer videoUrl="https://example.com/video.m3u8" />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('displays playback speed buttons', () => {
    render(<EnhancedVideoPlayer videoUrl="https://example.com/video.m3u8" />)
    expect(screen.getByText('0.5x')).toBeInTheDocument()
    expect(screen.getByText('1x')).toBeInTheDocument()
  })
})
```

### E2E Tests

```typescript
// e2e/video-player.spec.ts
import { test, expect } from '@playwright/test'

test('video player modal opens and closes', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Click button
  await page.click('button:has-text("Start Playing Video")')
  
  // Check modal is visible
  const modal = page.locator('[role="dialog"]')
  await expect(modal).toBeVisible()
  
  // Click close
  await page.click('button:has-text("Close")')
  
  // Check modal is hidden
  await expect(modal).not.toBeVisible()
})
```

---

**Last Updated**: February 2026
**Version**: 1.0.0
