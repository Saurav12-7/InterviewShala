#!/bin/bash

echo "🚀 InterviewShala E-Commerce Platform Deployment Script"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if backend package.json exists
if [ ! -f "backend/package.json" ]; then
    echo "❌ Backend package.json not found. Please ensure you're in the correct directory."
    exit 1
fi

# Check if frontend package.json exists
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Frontend package.json not found. Please ensure you're in the correct directory."
    exit 1
fi

echo "✅ Project structure verified"

# Install dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Dependencies installed"

# Build frontend for testing
echo "🔨 Building frontend for testing..."
cd frontend
npm run build
cd ..

echo "✅ Frontend build successful"

echo ""
echo "🎉 Setup Complete! Next Steps:"
echo ""
echo "1. 📝 Set up MongoDB Atlas:"
echo "   - Create account at https://www.mongodb.com/atlas"
echo "   - Create a cluster and get connection string"
echo ""
echo "2. 🌐 Deploy Backend on Render:"
echo "   - Go to https://render.com"
echo "   - Connect your GitHub repository"
echo "   - Create new Web Service"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "3. 🎨 Deploy Frontend on Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set root directory to 'frontend'"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "4. 🔗 Update Environment Variables:"
echo "   - Update FRONTEND_URL in Render with your Vercel URL"
echo "   - Update VITE_API_URL in Vercel with your Render URL"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "Happy Deploying! 🚀" 