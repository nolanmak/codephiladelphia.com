# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Code & Coffee Philadelphia community website (codephiladelphia.com). A static website with a Node.js/Express server for local development and fetching Meetup events.

## Development Commands

```bash
# Install dependencies
npm install

# Run local server (port 3000)
npm start

# Alternative: Python HTTP server (port 8000)
python -m http.server
```

## Architecture

**Static Site**: HTML pages with shared CSS (global.css, index.css) and vanilla JavaScript.

**Server** (`server.js`): Express server that:
- Serves static files from root directory
- Proxies Meetup API requests via `/api/meetup-events` endpoint to avoid CORS issues in local development

**Key JavaScript**:
- `meetup.js`: Fetches and displays upcoming events from Meetup. Uses local API in development, allorigins.win CORS proxy in production.
- `menu.js`: Responsive mobile menu (hamburger) that activates at 1300px breakpoint.

**Styling**:
- `global.css`: CSS custom properties (variables), fonts (Vollkorn, Space Mono, Gloria Hallelujah), shared components
- PureCSS grid system for responsive layouts

## Color Palette (CSS Variables)

- `--background: #E9E3DC`
- `--accent: #59969B`
- `--button: #3B2521` (also `--whimsy-text`)
- `--link: #278a93`

## Pages

- `index.html` - Home page with carousel, events, and project showcase
- `links.html` - Community links
- `project-request.html` - Project help request form
- `talent-matchboard.html` - Job/talent board
- `event-sponsorship.html` - Sponsorship information
- `blog-ptw-hackathon.html` - Blog post about PTW hackathon
