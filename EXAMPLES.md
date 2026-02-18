# Code Examples & Snippets

Ready-to-use code examples for common use cases with the Video Player.

## 🎬 Basic Usage Examples

### Example 1: Simple Video Player Page

```typescript
// app/watch/page.tsx
'use client'

import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'

export default function WatchPage() {
  const VIDEO_URL = 'https://vz-7335a46e-2e0.b-cdn.net/594c2931-3911-4bc3-a7ee-a085f5050931/playlist.m3u8'

  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-4">Watch Video</h1>
        <div className="aspect-video">
          <EnhancedVideoPlayer videoUrl={VIDEO_URL} />
        </div>
      </div>
    </main>
  )
}
```

### Example 2: Video with Metadata

```typescript
// app/video/[id]/page.tsx
'use client'

import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'
import { Card } from '@/components/ui/card'

interface VideoMetadata {
  id: string
  title: string
  description: string
  duration: number
  views: number
  uploadedAt: string
  streamUrl: string
}

export default function VideoPage({ params }: { params: { id: string } }) {
  // In production, fetch from API
  const video: VideoMetadata = {
    id: params.id,
    title: 'Amazing Video',
    description: 'This is an amazing video',
    duration: 600,
    views: 1000,
    uploadedAt: '2024-01-15',
    streamUrl: 'https://example.com/video.m3u8'
  }

  return (
    <main className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Video Player */}
        <div className="aspect-video mb-6">
          <EnhancedVideoPlayer videoUrl={video.streamUrl} />
        </div>

        {/* Video Info */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h1 className="text-white text-3xl font-bold mb-2">{video.title}</h1>
          <p className="text-slate-300 mb-4">{video.description}</p>
          
          <div className="flex gap-6 text-slate-400 text-sm">
            <div>
              <span className="font-semibold">{video.views.toLocaleString()}</span> views
            </div>
            <div>
              <span className="font-semibold">{Math.floor(video.duration / 60)}</span> minutes
            </div>
            <div>
              Uploaded {new Date(video.uploadedAt).toLocaleDateString()}
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
```

### Example 3: Multiple Videos in Grid

```typescript
// app/videos/page.tsx
'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: number
  streamUrl: string
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Video 1',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: 600,
    streamUrl: 'https://example.com/video1.m3u8'
  },
  {
    id: '2',
    title: 'Video 2',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: 900,
    streamUrl: 'https://example.com/video2.m3u8'
  },
  // ... more videos
]

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  return (
    <main className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">Videos</h1>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="bg-slate-800 border-slate-700 overflow-hidden hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                <p className="text-slate-400 text-sm">
                  {Math.floor(video.duration / 60)} minutes
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full h-[600px] p-0 bg-black border-slate-700">
          {selectedVideo && (
            <EnhancedVideoPlayer
              videoUrl={selectedVideo.streamUrl}
              onClose={() => setSelectedVideo(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
```

## 🎯 Advanced Examples

### Example 4: Video with Comments

```typescript
// app/video/[id]/page.tsx with comments
'use client'

import { useState } from 'react'
import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Comment {
  id: string
  author: string
  text: string
  timestamp: Date
  likes: number
}

export default function VideoWithComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          author: 'Anonymous',
          text: newComment,
          timestamp: new Date(),
          likes: 0
        }
      ])
      setNewComment('')
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Video Player */}
        <div className="aspect-video mb-6">
          <EnhancedVideoPlayer videoUrl="https://example.com/video.m3u8" />
        </div>

        {/* Comments Section */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h2 className="text-white text-2xl font-bold mb-6">Comments</h2>

          {/* Add Comment */}
          <div className="mb-6 space-y-3">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <Button
              onClick={handleAddComment}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Post Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card
                key={comment.id}
                className="bg-slate-700 border-slate-600 p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold">{comment.author}</h4>
                  <span className="text-slate-400 text-sm">
                    {comment.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-300 mb-3">{comment.text}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  👍 {comment.likes}
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
```

### Example 5: Video Playlist

```typescript
// components/VideoPlaylist.tsx
'use client'

import { useState } from 'react'
import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PlaylistVideo {
  id: string
  title: string
  duration: number
  streamUrl: string
}

interface PlaylistProps {
  title: string
  videos: PlaylistVideo[]
}

export function VideoPlaylist({ title, videos }: PlaylistProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentVideo = videos[currentIndex]

  const playNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Player */}
      <div className="lg:col-span-2">
        <div className="aspect-video mb-4">
          <EnhancedVideoPlayer videoUrl={currentVideo.streamUrl} />
        </div>
        <h2 className="text-white text-2xl font-bold mb-4">{currentVideo.title}</h2>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={playPrevious}
            disabled={currentIndex === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            ← Previous
          </Button>
          <Button
            onClick={playNext}
            disabled={currentIndex === videos.length - 1}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Next →
          </Button>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-white font-bold mb-4">{title}</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {videos.map((video, index) => (
            <Card
              key={video.id}
              onClick={() => setCurrentIndex(index)}
              className={`p-3 cursor-pointer transition-colors ${
                index === currentIndex
                  ? 'bg-blue-600 border-blue-500'
                  : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
              }`}
            >
              <p className="text-white font-semibold text-sm">{video.title}</p>
              <p className="text-slate-300 text-xs">
                {Math.floor(video.duration / 60)} min
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Example 6: Live Stream Player

```typescript
// components/LiveStreamPlayer.tsx
'use client'

import { useEffect, useState } from 'react'
import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'
import { Badge } from '@/components/ui/badge'

interface LiveStreamProps {
  streamUrl: string
  title: string
  viewers: number
}

export function LiveStreamPlayer({ streamUrl, title, viewers }: LiveStreamProps) {
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Check if stream is still live
    const checkLiveStatus = setInterval(async () => {
      try {
        const response = await fetch(streamUrl, { method: 'HEAD' })
        setIsLive(response.ok)
      } catch {
        setIsLive(false)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(checkLiveStatus)
  }, [streamUrl])

  return (
    <div className="space-y-4">
      {/* Live Badge */}
      <div className="flex items-center gap-2">
        <Badge className="bg-red-600 text-white animate-pulse">
          {isLive ? '🔴 LIVE' : '⚫ OFFLINE'}
        </Badge>
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <span className="text-slate-400">
          {viewers.toLocaleString()} watching
        </span>
      </div>

      {/* Video Player */}
      <div className="aspect-video">
        <EnhancedVideoPlayer videoUrl={streamUrl} />
      </div>
    </div>
  )
}
```

## 🔧 Utility Functions

### Example 7: Video Duration Formatter

```typescript
// lib/videoUtils.ts
/**
 * Format seconds to readable duration string
 * @param seconds - Duration in seconds
 * @returns Formatted string (e.g., "1:23:45")
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get video quality label from resolution
 */
export function getQualityLabel(resolution: string): string {
  const labels: Record<string, string> = {
    '360': '360p (Low)',
    '480': '480p (Standard)',
    '720': '720p (HD)',
    '1080': '1080p (Full HD)',
    'auto': 'Auto (Adaptive)'
  }
  return labels[resolution] || resolution
}

/**
 * Calculate video file size
 */
export function estimateFileSize(
  duration: number,
  bitrate: number
): string {
  const bytes = (duration * bitrate) / 8
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(2)} MB`
}
```

### Example 8: Video Validation

```typescript
// lib/videoValidation.ts
/**
 * Validate video URL format
 */
export function isValidVideoUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const validExtensions = ['.m3u8', '.mp4', '.webm', '.mkv']
    return validExtensions.some(ext => urlObj.pathname.endsWith(ext))
  } catch {
    return false
  }
}

/**
 * Check if URL is HLS stream
 */
export function isHLSStream(url: string): boolean {
  return url.endsWith('.m3u8')
}

/**
 * Get MIME type for video URL
 */
export function getVideoMimeType(url: string): string {
  if (isHLSStream(url)) return 'application/x-mpegURL'
  if (url.endsWith('.mp4')) return 'video/mp4'
  if (url.endsWith('.webm')) return 'video/webm'
  if (url.endsWith('.mkv')) return 'video/x-matroska'
  return 'video/mp4' // Default
}
```

## 🎨 Custom Hooks

### Example 9: useVideoPlayer Hook

```typescript
// hooks/useVideoPlayer.ts
import { useRef, useCallback, useState } from 'react'
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player'

export function useVideoPlayer(videoUrl: string) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<Player | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const initializePlayer = useCallback(() => {
    if (!videoRef.current) return

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      responsive: true,
      fluid: true
    })

    playerRef.current = player

    player.on('play', () => setIsPlaying(true))
    player.on('pause', () => setIsPlaying(false))
    player.on('timeupdate', () => setCurrentTime(player.currentTime()))
    player.on('loadedmetadata', () => setDuration(player.duration()))

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
      }
    }
  }, [])

  const play = useCallback(() => {
    playerRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    playerRef.current?.pause()
  }, [])

  const seek = useCallback((time: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime(time)
    }
  }, [])

  const setPlaybackRate = useCallback((rate: number) => {
    if (playerRef.current) {
      playerRef.current.playbackRate(rate)
    }
  }, [])

  return {
    videoRef,
    playerRef,
    isPlaying,
    currentTime,
    duration,
    initializePlayer,
    play,
    pause,
    seek,
    setPlaybackRate
  }
}
```

### Example 10: useVideoAnalytics Hook

```typescript
// hooks/useVideoAnalytics.ts
import { useEffect } from 'react'
import type Player from 'video.js/dist/types/player'

interface VideoAnalyticsEvent {
  event: string
  timestamp: number
  data: Record<string, any>
}

export function useVideoAnalytics(player: Player | null, videoId: string) {
  useEffect(() => {
    if (!player) return

    const events: VideoAnalyticsEvent[] = []

    // Track play
    player.on('play', () => {
      events.push({
        event: 'play',
        timestamp: Date.now(),
        data: { currentTime: player.currentTime() }
      })
    })

    // Track pause
    player.on('pause', () => {
      events.push({
        event: 'pause',
        timestamp: Date.now(),
        data: { currentTime: player.currentTime() }
      })
    })

    // Track completion
    player.on('ended', () => {
      events.push({
        event: 'complete',
        timestamp: Date.now(),
        data: { duration: player.duration() }
      })
      // Send analytics
      sendAnalytics(videoId, events)
    })

    // Track quality change
    player.on('qualitychange', (e: any) => {
      events.push({
        event: 'quality_change',
        timestamp: Date.now(),
        data: { quality: e.detail.quality }
      })
    })
  }, [player, videoId])
}

async function sendAnalytics(videoId: string, events: VideoAnalyticsEvent[]) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, events })
    })
  } catch (error) {
    console.error('Failed to send analytics:', error)
  }
}
```

---

**Last Updated**: February 2026
**Version**: 1.0.0
