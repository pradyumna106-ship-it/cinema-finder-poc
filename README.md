# Cinema Finder POC

Cinema Finder is a responsive web application for discovering cinemas across Australia and New Zealand. It provides an interactive map, nearby-cinema search, franchise filtering, and a complete proof-of-concept ticket booking experience.

## About the Project

This project was developed as part of a **Datacom internship project through Forage**. The solution demonstrates practical software development skills, including debugging existing functionality, implementing new features, improving the user interface, and building reusable React components.

## Features

- Interactive cinema map with Leaflet and MapLibre support
- Cinema markers and detailed map popups
- Cinema discovery across Australia and New Zealand
- Locate nearby cinemas using the user's position
- Browse cinemas by franchise and country
- Responsive cinema list and side panel views
- Cinema details, including showtimes and franchise information
- Multiple map styles and map controls
- Ticket booking flow with:
  - Adult, child, and concession tickets
  - Interactive seat selection
  - Cinema snack and drink selections
  - Customer name and email details
  - Automatic price calculation
  - Booking reference generation
  - Printable digital ticket confirmation
- Route handling with a custom 404 view
- Component-level unit tests for cinema and franchise data

## Internship Contributions

During the Datacom Forage internship, the project was improved through bug fixes and new feature development, including:

- Fixed and improved application navigation and route handling
- Resolved cinema marker and nearby-cinema issues
- Improved location and geolocation behaviour
- Enhanced booking and seat-selection functionality
- Fixed UI rendering, layout, and responsive design issues
- Added a modernised cinema discovery interface
- Added map popups and cinema detail views
- Expanded cinema, franchise, and nearby-cinema functionality
- Implemented reusable components and application state management
- Improved error handling and the not-found experience

## Tech Stack

- **Frontend:** React 18
- **Routing:** React Router DOM
- **UI Components:** Material UI (MUI) and Emotion
- **Mapping:** Leaflet, MapLibre GL, React Leaflet, and React Map GL
- **Geolocation:** react-geolocated and browser location APIs
- **State Management:** React Context and React hooks
- **Data and Utilities:** JavaScript, JSON, Turf.js, Lodash, and D3 Format
- **Notifications:** Notistack
- **Testing:** React Testing Library and Jest
- **Build Tool:** Create React App
- **Package Managers:** npm and Yarn

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn

### Installation

```bash
npm install
```

### Run Locally

```bash
npm start
```

The application will open at `http://localhost:3000`.

### Run Tests

```bash
npm test
```

### Create a Production Build

```bash
npm run build
```

## Project Structure

```text
src/
├── assets/       # Images and static assets
├── components/   # React components, maps, lists, and booking UI
├── context/      # Shared cinema application state
├── data/         # Cinema, franchise, location, and bounds data
├── utils/        # Shared helper functions
├── App.js        # Application routes and layout
└── index.js      # React application entry point
```

## Internship

Completed as part of the **Datacom Virtual Internship experience on Forage**, where I worked on a practical cinema-finder proof of concept, identified issues, fixed bugs, and added features to improve usability and functionality.
