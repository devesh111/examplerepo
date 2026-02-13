import { SearchAutocomplete } from '@/components/SearchAutocomplete'

/**
 * Home Page
 * 
 * Displays the search autocomplete component as the main feature
 * Clean, minimal design with centered search box
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center px-4">
      {/* Main Container */}
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Search Everything
          </h1>
          <p className="text-xl text-muted-foreground">
            Find movies, shows, and more with intelligent autocomplete
          </p>
        </div>

        {/* Search Component */}
        <div className="mb-12">
          <SearchAutocomplete />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Feature 1 */}
          <div className="text-center p-6 rounded-lg bg-card border">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Fast Autocomplete</h3>
            <p className="text-sm text-muted-foreground">
              Get instant suggestions as you type with real-time API integration
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 rounded-lg bg-card border">
            <div className="text-3xl mb-3">🎬</div>
            <h3 className="font-semibold mb-2">Comprehensive Results</h3>
            <p className="text-sm text-muted-foreground">
              Search across movies, shows, and more from the OTTPlay database
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 rounded-lg bg-card border">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Fully Responsive</h3>
            <p className="text-sm text-muted-foreground">
              Works seamlessly on desktop, tablet, and mobile devices
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 p-6 rounded-lg bg-muted/50 border text-center">
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-semibold">Tip:</span> Start typing to see autocomplete suggestions. Press Enter or click "See all search results" to view the full results page.
          </p>
        </div>
      </div>
    </div>
  )
}
