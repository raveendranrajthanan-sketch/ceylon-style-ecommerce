# 👑 Ceylon Style – Premium Fashion E-Commerce Website

A modern and responsive fashion e-commerce website built using **React, Vite, JavaScript, Bootstrap, and CSS**.

Ceylon Style provides customers with a premium online shopping experience through an elegant black-and-gold design, product collections, shopping cart, checkout system, and order management.

## 🌐 Live Demo

Coming Soon

## 📌 Project Overview

Ceylon Style is a fashion e-commerce web application designed to provide a simple, convenient, and user-friendly online shopping experience.

Customers can explore fashion products, filter collections, add products to their shopping cart, complete checkout forms, and view their order history.

The website also includes an administrative section for managing products and customer orders.

## ✨ Main Features

### Customer Features
- Premium homepage with featured products.
- Browse products by category.
- Search products by name.
- Filter products by category.
- Filter products by minimum and maximum price.
- Filter by product rating.
- Filter in-stock products.
- Sort products by price and name.
- Add products to shopping cart.
- Increase and decrease product quantities.
- Remove products from cart.
- Automatic cart total calculation.
- Checkout form with validation.
- Cash on Delivery and demo Card Payment options.
- Order confirmation.
- Order history.
- Contact form with validation.

### Admin Features
- Admin login.
- Admin dashboard.
- Product management.
- Order management.
- View and manage customer orders.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development server and build tool |
| JavaScript | Application functionality |
| React Router | Page navigation |
| Bootstrap | Responsive layout |
| CSS3 | Custom styling and animations |
| LocalStorage | Cart, products and order data |
| Git | Version control |
| GitHub | Source code hosting |

## 📂 Project Structure

```text
ceylon-style/
│
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── FilterPanel.jsx
│   │   └── FormField.jsx
│   │
│   ├── constants/
│   │   └── data.js
│   │
│   ├── hooks/
│   │   └── useCart.js
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── AdminLoginPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProductsPage.jsx
│   │   └── AdminOrdersPage.jsx
│   │
│   ├── utils/
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/raveendranrajthanan-sketch/ceylon-style-ecommerce.git
```

### 2. Navigate to Project Folder

```bash
cd ceylon-style-ecommerce
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open in Browser

```text
http://localhost:5173/
```

## 🛒 Shopping Cart

The shopping cart uses a custom React hook called `useCart`.

Cart information is stored in browser LocalStorage to maintain cart data across page refreshes.

## 🧾 Checkout and Orders

The checkout system includes:
- Customer information form.
- Input validation.
- Delivery fee calculation.
- Payment method selection.
- Order confirmation.
- Order history.

**Note:** Card payment is a demonstration option only. No real payment is processed. Orders are stored in browser LocalStorage.

## 🔐 Admin Access

The project includes a demonstration admin login and management interface.

**Demo credentials:**
- Username: `admin`
- Password: `12345`

Note: This is a frontend demonstration login, not production-level authentication.

## 🧪 Testing Checklist

- [ ] Homepage navigation.
- [ ] Category navigation.
- [ ] Product search.
- [ ] Category filtering.
- [ ] Price filtering.
- [ ] Rating filtering.
- [ ] Stock filtering.
- [ ] Product sorting.
- [ ] Add to cart.
- [ ] Update product quantity.
- [ ] Remove cart items.
- [ ] LocalStorage persistence.
- [ ] Checkout validation.
- [ ] Order confirmation.
- [ ] Order history.
- [ ] Contact form validation.
- [ ] Admin product management.
- [ ] Admin order management.
- [ ] Responsive design testing.

## 📱 Responsive Design

The website is designed to support different screen sizes:

- Mobile devices.
- Tablets.
- Desktop computers.

## 🖼️ Screenshots

Add your actual project screenshots in this section.

Suggested screenshots:
- Homepage
- Categories Page
- Shop Page
- Shopping Cart
- Checkout Page
- Admin Dashboard

## 🤖 AI Usage Declaration

AI tools were used as development assistance during this project for:
- Understanding React concepts.
- Debugging and resolving coding issues.
- Improving CSS styling.
- Reviewing component structure.
- Improving documentation.

The project code was reviewed and tested during development.

## 👨‍💻 Developer

**Raveendran Rajthanan**

GitHub: [raveendranrajthanan-sketch](https://github.com/raveendranrajthanan-sketch)

Project Repository: [Ceylon Style E-Commerce](https://github.com/raveendranrajthanan-sketch/ceylon-style-ecommerce)

---

**Ceylon Style – Wear Your Style. Feel The Difference.** 👑