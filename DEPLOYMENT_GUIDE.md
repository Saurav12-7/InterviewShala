# Complete Deployment Guide for All Projects

This guide covers deployment for all projects in your workspace on Render (Backend) and Vercel (Frontend).

## 📋 Projects Overview

### 1. MERN-E-Commerce-Store
- **Type**: Full-stack E-commerce Platform
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite + Redux + Tailwind CSS
- **Features**: User auth, product management, shopping cart, payments

### 2. Quiz2/quiz-final
- **Type**: Quiz Application
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite + Tailwind CSS
- **Features**: Quiz creation, student/teacher dashboards

### 3. calender/my-calendar-app
- **Type**: Calendar Application
- **Frontend**: React (Create React App)
- **Features**: Calendar booking system

### 4. Stripe 2
- **Type**: Stripe Integration Demo
- **Backend**: Node.js + Express
- **Frontend**: React (Create React App)
- **Features**: Stripe payment processing

## 🚀 Deployment Strategy

### Backend Deployment (Render)
- **Platform**: Render.com
- **Service Type**: Web Service
- **Database**: MongoDB Atlas
- **Environment**: Node.js

### Frontend Deployment (Vercel)
- **Platform**: Vercel.com
- **Framework**: React/Vite
- **Build Tool**: Vite
- **Environment**: Static hosting

## 📝 Prerequisites

1. **GitHub Account** - To host your code
2. **MongoDB Atlas Account** - For cloud database
3. **Render Account** - For backend deployment
4. **Vercel Account** - For frontend deployment
5. **Stripe Account** (optional) - For payment processing
6. **PayPal Account** (optional) - For payment processing

## 🔧 Project 1: MERN-E-Commerce-Store

### Backend Deployment (Render)

1. **Prepare Backend**
   ```bash
   cd MERN-E-Commerce-Store/backend
   # Ensure package.json has proper scripts
   # Ensure environment variables are configured
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd MERN-E-Commerce-Store/frontend
   # Ensure package.json has build script
   # Ensure environment variables are configured
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

## 🔧 Project 2: Quiz Application

### Backend Deployment (Render)

1. **Prepare Backend**
   ```bash
   cd Quiz2/quiz-final/backend
   # Ensure package.json has proper scripts
   # Ensure environment variables are configured
   ```

2. **Deploy on Render**
   - Create new Web Service
   - **Root Directory**: `Quiz2/quiz-final/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   FRONTEND_URL=https://your-quiz-frontend-domain.vercel.app
   ```

### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd Quiz2/quiz-final/frontend
   # Ensure package.json has build script
   # Ensure environment variables are configured
   ```

2. **Deploy on Vercel**
   - Import GitHub repository
   - **Root Directory**: `Quiz2/quiz-final/frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-quiz-backend-domain.onrender.com
   ```

## 🔧 Project 3: Calendar Application

### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd calender/my-calendar-app
   # This is a Create React App project
   # Ensure package.json has build script
   ```

2. **Deploy on Vercel**
   - Import GitHub repository
   - **Root Directory**: `calender/my-calendar-app`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

## 🔧 Project 4: Stripe Integration

### Backend Deployment (Render)

1. **Prepare Backend**
   ```bash
   cd "Stripe 2/StripeBackend"
   # Ensure package.json has proper scripts
   ```

2. **Deploy on Render**
   - Create new Web Service
   - **Root Directory**: `Stripe 2/StripeBackend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   STRIPE_SECRET_KEY=your_stripe_secret_key
   FRONTEND_URL=https://your-stripe-frontend-domain.vercel.app
   ```

### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd "Stripe 2/stripefrontend"
   # This is a Create React App project
   ```

2. **Deploy on Vercel**
   - Import GitHub repository
   - **Root Directory**: `Stripe 2/stripefrontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

3. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-stripe-backend-domain.onrender.com
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

## 🗄️ Database Setup (MongoDB Atlas)

### For All Projects

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select cloud provider and region
   - Create cluster

3. **Set Up Database Access**
   - Create database user with read/write permissions
   - Note username and password

4. **Set Up Network Access**
   - Add IP address `0.0.0.0/0` (allows all IPs)
   - Or add specific IP addresses

5. **Get Connection String**
   - Go to "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

## 🔄 Environment Variables Management

### Backend Environment Variables
```env
# Common for all backends
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
FRONTEND_URL=https://your-frontend-domain.vercel.app

# E-commerce specific
JWT_SECRET=your_secure_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Frontend Environment Variables
```env
# Vite projects (E-commerce, Quiz)
VITE_API_URL=https://your-backend-domain.onrender.com
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Create React App projects (Calendar, Stripe)
REACT_APP_API_URL=https://your-backend-domain.onrender.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🚀 Quick Deployment Commands

### Automated Deployment Script
```bash
# For MERN-E-Commerce-Store
cd MERN-E-Commerce-Store
chmod +x deploy.sh
./deploy.sh

# For Quiz Application
cd Quiz2/quiz-final
# Follow manual deployment steps
```

### Manual Deployment Steps
```bash
# 1. Push code to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Deploy backend on Render
# - Go to render.com
# - Create web service
# - Connect repository
# - Set environment variables

# 3. Deploy frontend on Vercel
# - Go to vercel.com
# - Import repository
# - Set environment variables
```

## 🔍 Testing Deployments

### Backend Health Checks
```bash
# Test backend endpoints
curl https://your-backend-domain.onrender.com/health

# Expected response
{"status":"OK","message":"Server is running"}
```

### Frontend Testing
1. Visit your Vercel frontend URL
2. Test core functionality
3. Check console for errors
4. Verify API connections

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in backend matches Vercel domain
   - Include `https://` protocol
   - Check browser console for specific errors

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **Build Failures**
   - Check package.json dependencies
   - Verify Node.js version compatibility
   - Check build logs in deployment platform

4. **Environment Variables Not Working**
   - Ensure variable names match exactly (case-sensitive)
   - Redeploy after adding new variables
   - Check platform-specific variable naming

### Debug Commands
```bash
# Check backend logs
# Render Dashboard → Service → Logs

# Check frontend logs
# Vercel Dashboard → Project → Functions → Logs

# Local testing
npm run build
npm run preview
```

## 📊 Monitoring and Maintenance

### Performance Monitoring
- Enable Render's built-in monitoring
- Set up Vercel analytics
- Monitor MongoDB Atlas metrics

### Security Best Practices
- Use strong, unique secrets
- Rotate API keys regularly
- Enable HTTPS everywhere
- Implement rate limiting

### Regular Maintenance
- Keep dependencies updated
- Monitor for security vulnerabilities
- Regular database backups
- Performance optimization

## 🆘 Support Resources

### Documentation
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

### Community
- [Render Community](https://community.render.com)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [MongoDB Community](https://community.mongodb.com)

---

## 🎉 Deployment Checklist

### Before Deployment
- [ ] Code is pushed to GitHub
- [ ] Environment variables are prepared
- [ ] MongoDB Atlas is configured
- [ ] Dependencies are up to date

### Backend Deployment
- [ ] Render account created
- [ ] Web service configured
- [ ] Environment variables set
- [ ] Health check endpoint working
- [ ] Database connection successful

### Frontend Deployment
- [ ] Vercel account created
- [ ] Project imported
- [ ] Environment variables set
- [ ] Build successful
- [ ] API connection working

### Post-Deployment
- [ ] All features tested
- [ ] Performance monitored
- [ ] Error tracking set up
- [ ] Documentation updated

---

**Happy Deploying! 🚀**

For specific project deployment details, see individual project folders:
- `MERN-E-Commerce-Store/DEPLOYMENT.md`
- `Quiz2/quiz-final/` (follow general guide)
- `calender/my-calendar-app/` (Vercel only)
- `Stripe 2/` (follow general guide) 