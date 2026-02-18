'use client'

import { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import type Player from 'video.js/dist/types/player'

/**
 * VideoPlayer Component
 * 
 * A custom video player component using video.js with:
 * - Playback speed control (0.5x, 1x, 1.5x, 2x)
 * - Resolution selection (multiple quality options)
 * - HLS stream support (m3u8 format)
 * 
 * @param videoUrl - The URL of the video stream (m3u8 format)
 * @param onClose - Callback function when player should close
 */
interface VideoPlayerProps {
  videoUrl: string
  onClose?: () => void
}

export function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize video.js player
    if (!videoRef.current) return

    // Create player instance with configuration
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      responsive: true,
      fluid: true,
      // HLS configuration for m3u8 streams
      html5: {
        hls: {
          overrideNative: true,
        },
      },
    })

    playerRef.current = player

    // Add playback rate menu button
    // This allows users to select different playback speeds
    const playbackRateButton = player.controlBar.addChild('button', {
      text: '1x',
    })
    playbackRateButton.addClass('vjs-playback-rate-button')

    // Create playback rate menu
    const playbackRates = [0.5, 1, 1.5, 2]
    playbackRates.forEach((rate) => {
      const menuItem = player.controlBar.playbackRateMenuButton.createEl('li', {
        innerHTML: `<span class="vjs-menu-item-text">${rate}x</span>`,
      })
      menuItem.addEventListener('click', () => {
        player.playbackRate(rate)
      })
    })

    // Add resolution/quality selector
    // This allows users to switch between different video qualities
    if (player.qualityLevels && player.qualityLevels().length > 0) {
      const qualityButton = player.controlBar.addChild('button', {
        text: 'Quality',
      })
      qualityButton.addClass('vjs-quality-button')
    }

    // Handle player ready event
    player.ready(() => {
      setIsReady(true)
    })

    // Cleanup function - dispose player on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

  // Update video source when URL changes
  useEffect(() => {
    if (playerRef.current && isReady) {
      playerRef.current.src({
        src: videoUrl,
        type: 'application/x-mpegURL', // HLS stream type
      })
    }
  }, [videoUrl, isReady])

  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Video.js player container */}
      <div data-vjs-player className="h-full">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin vjs-big-play-centered"
          controls
          preload="auto"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}
