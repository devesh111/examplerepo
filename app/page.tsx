'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { EnhancedVideoPlayer } from '@/components/EnhancedVideoPlayer'

const VIDEO_URL = 'https://vz-7335a46e-2e0.b-cdn.net/594c2931-3911-4bc3-a7ee-a085f5050931/playlist.m3u8'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="pt-20 pb-12 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Video Player</h1>
        <p className="text-xl text-slate-300">Watch videos with advanced playback controls</p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Playback Speed</h3>
            <p className="text-slate-400">Control playback speed from 0.5x to 2x</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">Resolution</h3>
            <p className="text-slate-400">Select your preferred video quality</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <div className="text-4xl mb-4">📺</div>
            <h3 className="text-xl font-semibold mb-2">Modal Player</h3>
            <p className="text-slate-400">Watch in a beautiful modal dialog</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-12">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg"
          >
            Start Playing Video
          </Button>
          <p className="text-slate-400 mt-4 text-sm">Click the button above to open the video player in a modal</p>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[600px] p-0 bg-black border-slate-700 flex flex-col">
          {/* Hidden DialogTitle for accessibility */}
          <DialogTitle className="sr-only">Video Player</DialogTitle>

          {/* Video Player - fills the modal */}
          <div className="flex-1 w-full h-full">
            <EnhancedVideoPlayer
              videoUrl={VIDEO_URL}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
