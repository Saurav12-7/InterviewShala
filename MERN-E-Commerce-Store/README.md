# InterviewShala - E-Commerce Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce platform with modern features including user authentication, product management, shopping cart, payment integration, and admin dashboard.

## 🚀 Features

### User Features
- **User Authentication**: Register, login, and profile management
- **Product Browsing**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save favorite products
- **Order Management**: Place orders, track order status
- **Payment Integration**: Stripe and PayPal payment processing
- **Product Reviews**: Rate and review products
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Dashboard**: Analytics and overview
- **Product Management**: Add, edit, delete products
- **Category Management**: Organize products by categories
- **Order Management**: Process and track orders
- **User Management**: Manage user accounts
- **File Upload**: Image upload for products

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Material Tailwind** - UI components
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Stripe** - Payment processing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
MERN-E-Commerce-Store/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store and slices
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── DEPLOYMENT.md           # Deployment guide
├── deploy.sh              # Deployment script
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MERN-E-Commerce-Store
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   **Backend (.env file in backend directory):**
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend (.env file in frontend directory):**
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the application**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run backend
   
   # Frontend only
   npm run frontend
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 🌐 Deployment

This project is configured for deployment on:
- **Backend**: Render (Node.js hosting)
- **Frontend**: Vercel (React hosting)
- **Database**: MongoDB Atlas (cloud database)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deployment
```bash
# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/users` - Register user
- `POST /api/users/auth` - Login user
- `POST /api/users/logout` - Logout user
- `PUT /api/users/profile` - Update profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid

### Category Endpoints
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (admin)
- `PUT /api/category/:id` - Update category (admin)
- `DELETE /api/category/:id` - Delete category (admin)

## 🔧 Configuration

### Database Configuration
The application uses MongoDB with Mongoose ODM. Configure your database connection in `backend/config/db.js`.

### Payment Configuration
- **Stripe**: Configure Stripe keys for payment processing
- **PayPal**: Configure PayPal client ID for alternative payments

### File Upload
Product images are stored locally in the `uploads` directory. For production, consider using cloud storage services like AWS S3 or Cloudinary.

## 🧪 Testing

```bash
# Test backend
cd backend
npm test

# Test frontend
cd frontend
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Vaibhaw Kumar**
- GitHub: [@vaibhaw-kumar](https://github.com/vaibhaw-kumar)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database
- All contributors and users

---

**Happy Coding! 🚀** 