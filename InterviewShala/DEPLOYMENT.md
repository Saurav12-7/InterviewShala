# Deployment Guide for InterviewShala E-Commerce Platform

This guide will help you deploy your MERN stack e-commerce application on Render (Backend) and Vercel (Frontend).

## Prerequisites

1. **MongoDB Atlas Account** - For cloud database
2. **Render Account** - For backend deployment
3. **Vercel Account** - For frontend deployment
4. **GitHub Account** - To host your code

## Step 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Replace the connection string in your environment variables

## Step 2: Backend Deployment (Render)

### Option A: Using Render Dashboard

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your project

3. **Configure the Service**
   - **Name**: `interviewshala-backend`
   - **Root Directory**: `backend` (since your backend is in a subfolder)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the build to complete
   - Note your backend URL (e.g., `https://interviewshala-backend.onrender.com`)

### Option B: Using render.yaml (Recommended)

1. **Push your code to GitHub** (if not already done)
2. **Connect repository to Render**
3. **Render will automatically detect the render.yaml file**
4. **Set environment variables in Render dashboard**
5. **Deploy automatically**

## Step 3: Frontend Deployment (Vercel)

### Option A: Using Vercel Dashboard

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set the root directory to `frontend`

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Note your frontend URL

### Option B: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts and set environment variables**

## Step 4: Update Environment Variables

After both deployments are complete:

1. **Update Backend Environment Variables**
   - Go to your Render dashboard
   - Update `FRONTEND_URL` with your Vercel frontend URL

2. **Update Frontend Environment Variables**
   - Go to your Vercel dashboard
   - Update `VITE_API_URL` with your Render backend URL

## Step 5: Test Your Deployment

1. **Test Backend Health Check**
   - Visit: `https://your-backend-domain.onrender.com/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**
   - Visit your Vercel frontend URL
   - Test user registration/login
   - Test product browsing
   - Test cart functionality

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in backend environment variables matches your Vercel domain
   - Check that the URL includes `https://` protocol

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Ensure IP whitelist includes `0.0.0.0/0` for Render

3. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility

4. **Environment Variables Not Working**
   - Ensure variable names match exactly (case-sensitive)
   - Redeploy after adding new environment variables

### Useful Commands:

```bash
# Check backend logs in Render
# Go to Render dashboard → Your service → Logs

# Check frontend logs in Vercel
# Go to Vercel dashboard → Your project → Functions → View Function Logs

# Local testing with production environment
cd backend
npm start

cd frontend
npm run build
npm run preview
```

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to Git
   - Use strong, unique secrets for JWT_SECRET
   - Rotate API keys regularly

2. **Database Security**
   - Use MongoDB Atlas network access controls
   - Enable database user authentication
   - Regular backups

3. **API Security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS in production

## Monitoring and Maintenance

1. **Set up monitoring**
   - Enable Render's built-in monitoring
   - Set up Vercel analytics
   - Monitor MongoDB Atlas metrics

2. **Regular updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Regular database backups

## Support

If you encounter issues:
1. Check the logs in both Render and Vercel dashboards
2. Verify all environment variables are set correctly
3. Test locally with production environment variables
4. Check the troubleshooting section above

---

**Happy Deploying! 🚀** 