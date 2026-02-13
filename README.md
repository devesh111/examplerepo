# Search Autocomplete with Next.js

A modern, fully-featured search autocomplete component built with Next.js, React, and shadcn/ui. Integrates with the OTTPlay API to provide real-time search suggestions for movies, shows, and more.

## 🎯 Features

### Autocomplete Search Box
- **Real-time suggestions** - Get instant autocomplete results as you type
- **Debounced API calls** - Optimized to reduce server load (300ms debounce)
- **Maximum 5 visible results** - Shows top 5 results with scrollable area for more
- **Loading state** - Visual feedback while fetching results
- **Keyboard navigation** - Arrow keys to navigate, Enter to select, Escape to close

### Search Results Page
- **Full results display** - Shows all results from the API in a responsive card grid
- **Result cards** - Each result displays:
  - Thumbnail image
  - Title
  - Content type badge
  - Description
  - View Details button
- **Responsive grid** - Adapts from 1 column (mobile) to 4 columns (desktop)
- **Search from results** - Search box available on results page for new searches
- **Back navigation** - Easy return to home page

### User Experience
- **"See all search results" button** - Navigate to full results page from autocomplete
- **Enter key support** - Press Enter in search box to view full results
- **Click outside to close** - Dropdown closes when clicking outside
- **No results handling** - Helpful messages when no results found
- **Error handling** - Graceful error messages if API fails

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **API**: OTTPlay Universal Autocomplete API

## 📁 Project Structure

```
search-autocomplete/
├── app/
│   ├── page.tsx                 # Home page with search component
│   ├── search/
│   │   └── page.tsx            # Search results page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── SearchAutocomplete.tsx   # Main autocomplete component
│   └── ui/                      # shadcn/ui components
├── lib/
│   └── utils.ts                # Utility functions
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone or navigate to the project**:
```bash
cd search-autocomplete
```

2. **Install dependencies** (if not already installed):
```bash
npm install
# or
bun install
```

3. **Start the development server**:
```bash
npm run dev
# or
bun dev
```

4. **Open in browser**:
Navigate to `http://localhost:3000`

## 📖 Usage

### Basic Search
1. Click on the search input box
2. Start typing your search query
3. Autocomplete suggestions appear after 300ms
4. Click on a result or press Enter to view full results

### Keyboard Shortcuts
- **Arrow Up/Down** - Navigate through autocomplete results
- **Enter** - Submit search and go to results page
- **Escape** - Close autocomplete dropdown

### Search Results Page
- View all results in a responsive grid
- Click "View Details" button on any card (extensible for detail pages)
- Use the search box to perform new searches
- Click "Back" button to return to home

## 🔌 API Integration

### OTTPlay API
The application uses the OTTPlay Universal Autocomplete API:

**Endpoint**: `https://api2.ottplay.com/api/search-service/v1.1/universal-autocomplete`

**Query Parameter**: `query` - The search term

**Example**:
```
https://api2.ottplay.com/api/search-service/v1.1/universal-autocomplete?query=avengers
```

**Response Format**:
```json
{
  "results": [
    {
      "id": "123",
      "title": "Avengers: Endgame",
      "type": "movie",
      "image": "https://...",
      "description": "..."
    }
  ]
}
```

## 🎨 Customization

### Styling
- All styles use Tailwind CSS utility classes
- Colors follow shadcn/ui theme system
- Modify `app/globals.css` for global style changes
- Update component classes for specific styling

### Component Props
The `SearchAutocomplete` component is self-contained and doesn't require props. It manages its own state and API calls.

### API Response Transformation
The component transforms API responses in the `fetchAutocomplete` function. Modify the transformation logic to match your API response structure:

```typescript
const transformedResults = (data.results || []).map((item: any) => ({
  id: item.id || item.title,
  title: item.title || item.name || '',
  type: item.type || 'content',
  image: item.image || item.poster,
  description: item.description || '',
}))
```

## 🔍 Features in Detail

### Autocomplete Component (`SearchAutocomplete.tsx`)

**Key Features**:
- Debounced API calls (300ms)
- Maximum 5 results displayed with scroll area
- "See all search results" button
- Keyboard navigation support
- Click outside to close
- Loading and error states
- Result thumbnails and metadata

**State Management**:
- `query` - Current search input
- `results` - Autocomplete results
- `isLoading` - Loading state
- `isOpen` - Dropdown visibility
- `selectedIndex` - Keyboard navigation index

### Search Results Page (`search/page.tsx`)

**Key Features**:
- Fetches full results from API
- Responsive grid layout (1-4 columns)
- Result cards with images and metadata
- Back button navigation
- Search box for new searches
- Loading, error, and no-results states

**Responsive Breakpoints**:
- Mobile: 1 column
- Tablet (sm): 2 columns
- Medium (md): 3 columns
- Desktop (lg): 4 columns

## 🧪 Testing

### Manual Testing Checklist
- [ ] Type in search box and see autocomplete suggestions
- [ ] Press Enter to go to results page
- [ ] Click "See all search results" button
- [ ] Navigate with arrow keys in autocomplete
- [ ] Press Escape to close dropdown
- [ ] Click outside dropdown to close
- [ ] Test on mobile, tablet, and desktop
- [ ] Verify images load correctly
- [ ] Check error handling with invalid queries

### Browser Console
- Open DevTools (F12)
- Check Console tab for any errors
- Verify API calls in Network tab

## 📱 Responsive Design

The application is fully responsive:

- **Mobile (< 640px)**: Single column layout, touch-friendly
- **Tablet (640px - 1024px)**: 2-3 column grid
- **Desktop (> 1024px)**: 4 column grid

All interactive elements have appropriate touch targets (44x44px minimum).

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states visible
- Color contrast meets WCAG AA standards
- Alt text on images

## 🐛 Troubleshooting

### No autocomplete results appearing
1. Check browser console for errors (F12)
2. Verify API endpoint is accessible
3. Check network tab to see API response
4. Ensure query parameter is being sent correctly

### Styling issues
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server
3. Check that Tailwind CSS is properly configured
4. Verify shadcn/ui components are installed

### API errors
1. Check OTTPlay API status
2. Verify query parameter encoding
3. Check CORS settings if running locally
4. Review API response format

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)

## 📝 Code Comments

All code is heavily commented to explain:
- Component purpose and functionality
- API integration details
- State management logic
- Event handlers and keyboard navigation
- Data transformation and formatting

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Some ideas for enhancement:
- Add filters (by type, year, rating)
- Implement pagination for results
- Add favorites/bookmarks feature
- Integrate with detail pages
- Add analytics tracking
- Implement caching for results

## 📧 Support

For issues or questions, please check the code comments or review the component documentation above.

---

**Built with ❤️ using Next.js and shadcn/ui**
