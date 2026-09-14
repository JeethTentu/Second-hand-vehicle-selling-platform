# ReWheel — Second-Hand Vehicle Selling Website

Frontend-only marketplace for browsing, searching, filtering, comparing, and listing
second-hand cars and bikes. Built per the Second-Hand Vehicle Selling Website SRS.

## Stack

- React 19 + Vite
- React Router v6 (routing)
- Tailwind CSS (utility styling, brand design tokens)
- react-bootstrap + Bootstrap 5 (Offcanvas mobile filter drawer, image-gallery Modal/Carousel, Toasts)
- Browser `localStorage` for favorites, compare list, mock user session, and seller listings — no backend

## Design

Arizona desert palette — Canyon Rust `#B7410E` (primary accent), Desert Sage `#9AA992`,
Turquoise Stone `#40E0D0`, Sandstone Beige `#D2B48C` — on a deep canyon-brown ink and warm
sand background. Oswald for headings, Inter for body text. Tokens live in `tailwind.config.js`.

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Features implemented

- Home: hero search, category tiles, featured/recently-added vehicles, popular brands,
  why-choose-us, testimonials
- Vehicle listing: search (name/brand/model, location, price range), filters (type, price
  band, fuel, transmission, year, location), sorting, pagination, empty state, mobile filter
  drawer
- Vehicle details: image gallery with lightbox, full spec sheet, features, seller card,
  favorite/compare/share actions, "message seller" contact form with validation
- Sell Vehicle: full validated multi-section form (vehicle info, pricing, location, images,
  description, contact), save draft, preview modal, submit
- Favorites & Compare (up to 3 vehicles, side-by-side table, add/remove)
- Login / Register with frontend validation (mock auth, no real backend)
- Dashboard: profile edit, my listings, favorites, compared vehicles, sample enquiries, logout
- Contact page, 404 page
- Responsive: hamburger nav, responsive grids, mobile filter Offcanvas, horizontal-scroll
  comparison table
- 20 mock vehicle records; vehicle photos are generated offline as SVGs (no network image
  dependency)

## Project structure

```
src/
  components/   Navbar, Footer, SearchBar, VehicleCard, FilterSidebar, VehicleGallery,
                SellerCard, Pagination, Breadcrumb, EmptyState, LoadingSpinner, ToastStack
  pages/        Home, Vehicles, VehicleDetails, SellVehicle, Favorites, Compare, Login,
                Register, Dashboard, Contact, NotFound
  context/      AppContext (favorites, compare, mock auth, listings, toasts)
  data/         vehicles.js (mock dataset + filter option lists)
  utils/        format.js (price/km formatting), placeholderImage.js (offline SVG photos)
```

## Notes

- No backend, database, payment gateway, or real authentication — per SRS scope. Login/Register
  accept any valid-format input and create a mock session in `localStorage`.
- Do not enter real personal or payment information anywhere in this demo.
