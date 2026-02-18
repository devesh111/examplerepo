import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * Metadata for the application
 * Includes SEO information and Open Graph tags for social sharing
 */
export const metadata: Metadata = {
  title: 'Video Player - Advanced Playback Controls',
  description: 'A modern video player with playback speed control, resolution selection, and modal interface built with Next.js and video.js',
  keywords: ['video player', 'video.js', 'streaming', 'HLS'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    siteName: 'Video Player',
    title: 'Video Player - Advanced Playback Controls',
    description: 'A modern video player with playback speed control and resolution selection',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Player - Advanced Playback Controls',
    description: 'A modern video player with playback speed control and resolution selection',
  },
}

/**
 * Root Layout Component
 * 
 * Provides the base HTML structure and styling for the entire application
 * Includes font configuration and global styles
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        {children}
      </body>
    </html>
  )
}
