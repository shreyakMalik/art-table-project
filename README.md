# Art Institute of Chicago – Artwork Table

React + TypeScript application built for a frontend internship assignment.
Displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with server-side pagination and persistent row selection.

## Tech Stack
- React (Vite)
- TypeScript
- PrimeReact
- Art Institute of Chicago API

## Features
- Server-side pagination (data fetched per page)
- PrimeReact DataTable implementation
- Displays required artwork fields
- Row selection with checkboxes
- Select/Deselect all rows on current page
- Custom overlay to select a specific number of rows
- Persistent row selection across page navigation

## Selection & Pagination Logic
- Only artwork IDs are stored for selection
- No prefetching of other pages
- No mass data storage
- Custom row selection operates only on current page data

## Setup
```bash
npm install
npm run dev
```

## Compliance
- Vite + TypeScript used
- PrimeReact DataTable used
- Server-side pagination implemented
- Persistent selection without fetching other pages
