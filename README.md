# WorldWise 🌍

A travel tracking application that allows users to mark and remember all the cities they've traveled to on an interactive world map.

## Features

- 🗺️ **Interactive Map**: Browse and interact with a world map powered by Leaflet
- 📍 **City Tracking**: Click on any location on the map to add cities you've visited
- 🌐 **Geolocation**: Use your current location to quickly navigate the map
- 📝 **City Details**: Add notes and dates for each city you visit
- 🌍 **Country Overview**: View all countries you've visited
- 🔐 **Protected Routes**: Secure authentication to keep your travel data private
- 📱 **Responsive Design**: Works seamlessly across different screen sizes

## Tech Stack

- **React 19** - UI library with latest features
- **React Router DOM v7** - Client-side routing with nested routes
- **Leaflet & React-Leaflet** - Interactive map implementation
- **Context API + useReducer** - Global state management
- **CSS Modules** - Scoped and maintainable styling
- **Vite** - Fast build tool and development server
- **json-server** - Mock backend API for development

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # React Context providers (Auth, Cities)
├── hooks/             # Custom React hooks
├── pages/             # Route-based page components
├── constants/         # Configuration and constants
├── utils/             # Utility functions
└── styles/            # Global styles
```

## Key Implementation Details

### State Management
- **CitiesContext**: Manages cities data with `useReducer` for complex state logic
- **AuthContext**: Handles user authentication and protected routes
- Custom hooks (`useCitiesContext`, `useUrlPosition`, `useGeolocation`) for cleaner component logic

### Performance Optimizations
- Lazy loading with `React.lazy()` and `Suspense` for code splitting
- `useCallback` hooks to prevent unnecessary re-renders
- Unique Suspense boundary keys to fix React Router v7 transition issues

### Routing Architecture
- Protected routes to secure the main app
- Nested routes for app sections (cities, countries, form)
- URL state management for map coordinates

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd worldwise
```

2. Install dependencies
```bash
npm install
```

3. Start the development server and API server
```bash
# Terminal 1 - Start Vite dev server
npm run dev

# Terminal 2 - Start JSON server
npm run server
```

4. Open your browser and navigate to `http://localhost:5173`

### Login Credentials (Demo)
- Email: `jack@example.com`
- Password: `qwerty`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON server on port 8000
- `npm run lint` - Run ESLint

## API Endpoints

The mock API (json-server) provides the following endpoints:

- `GET /cities` - Get all cities
- `GET /cities/:id` - Get city by ID
- `POST /cities` - Create new city
- `DELETE /cities/:id` - Delete city

## Environment Configuration

The API base URL is configured in `src/constants/index.js`:
```javascript
export const BASE_URL = 'http://localhost:8000';
```

## Known Issues & Solutions

### React Router v7 Suspense Issue
There's a known issue where Suspense fallbacks don't display during route transitions. This has been fixed by adding unique `key` props to each Suspense boundary. See [GitHub Issue #12474](https://github.com/remix-run/react-router/issues/12474) for more details.

## Future Enhancements

- Connect to a real backend API
- Add user registration
- Export travel data
- Share travel maps with friends
- Add photos to city entries
- Travel statistics and insights

## License

This project is part of "The Ultimate React Course 2025" on Udemy.
