# Jiddat by KVTC

**Fashion that empowers. Made with purpose.**

Jiddat is an e-commerce platform showcasing handcrafted apparel made by differently-abled artisans trained through KVTC (Karachi Vocational Training Centre). Every purchase directly supports artisan livelihoods and funds training programs.

## Features

- **Mission-First Home Page** - Hero section, story, "How It Works", impact metrics, and featured products
- **Shop Page** - Browse apparel with filters for category, size, color, and price
- **Product Details** - Multi-image gallery, size/color selection, material info, and artisan maker stories
- **Donation Page** - Support the mission with preset or custom donation amounts
- **Our Story Page** - Learn about Jiddat's mission and KVTC partnership
- **Admin Panel** - Manage products with apparel-specific fields (sizes, colors, material, fit, care instructions, maker story)
- **User Accounts** - Registration, login, order history, saved addresses, wishlist

## Tech Stack

- **Frontend**: React 19, React Router, Vite, Tailwind CSS
- **Backend**: Express.js, MySQL2, JWT authentication
- **Icons**: React Icons (Feather Icons)

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8+ (or XAMPP)

### Installation

```bash
npm install
```

### Database Setup

1. Create `.env` in the `server/` folder:
   ```
   PORT=4000
   CLIENT_ORIGIN=http://localhost:5173

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=jiddat

   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   ```

2. Create database and tables:
   ```sql
   SOURCE server/schema.sql;
   SOURCE server/seed.sql;
   ```

3. (Optional) Create an admin user:
   ```sql
   INSERT INTO users (id, name, email, password, role) VALUES
   (UUID(), 'Admin', 'admin@jiddat.pk', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQDq.R2gKYbFH7ZZVkdPqI.YMNJPqKe', 'admin');
   ```
   Password: `admin123`

### Run Development

```bash
# Terminal 1 - Backend API
npm run server

# Terminal 2 - Frontend
npm run dev
```

Open http://localhost:5173

### Production Build

```bash
npm run build
npm run preview
```

## API Endpoints

### Public
- `GET /api/catalog/hero-banners`
- `GET /api/catalog/categories`
- `GET /api/catalog/recommendations`
- `GET /api/products`
- `GET /api/products/:productId`

### Auth
- `POST /api/auth/register` - `{ name, email, password }`
- `POST /api/auth/login` - `{ email, password }`
- `GET /api/auth/me` (Bearer token)

### Donations
- `POST /api/donations` - `{ amount, donorName?, donorEmail?, message? }`
- `GET /api/donations/:id`

### Protected (Bearer token)
- `GET /api/account/me`
- `GET /api/wishlist`
- `POST /api/wishlist` - `{ productId }`
- `POST /api/orders/checkout`

## Project Structure

```
src/
  components/      # Layout, common UI components
  context/         # Auth, Cart, Wishlist providers
  data/            # Content configuration (content.js)
  layouts/         # Public and Admin layouts
  pages/           # Route pages (Home, Shop, Product, Donate, etc.)
  services/        # API abstraction

server/
  routes/          # API route handlers
  middleware/      # Auth middleware
  config/          # Database connection
  schema.sql       # Database structure
  seed.sql         # Sample apparel data
```

## Content Configuration

Edit `src/data/content.js` to update:
- Brand name and tagline
- Hero section text
- Impact metrics
- Navigation links
- Footer content
- Donation page content

## License

MIT
