#!/bin/bash
# Deploy The Void to production
# Usage: ./deploy.sh [production|railway|render|fly]

set -e

TARGET=${1:-production}

echo "🚀 Deploying The Void to $TARGET..."

case $TARGET in
  production)
    echo "📦 Building Docker image..."
    docker build -t the-void-api ./packages/simple-api
    
    echo "🚀 Starting services..."
    docker-compose up -d
    
    echo "✅ Deployed! API at http://localhost:3000"
    ;;
    
  railway)
    echo "🚂 Deploying to Railway..."
    railway up
    ;;
    
  render)
    echo "🎨 Deploying to Render..."
    # Requires render.yaml config
    ;;
    
  fly)
    echo "🪰 Deploying to Fly.io..."
    fly deploy
    ;;
    
  *)
    echo "Unknown target: $TARGET"
    echo "Available: production, railway, render, fly"
    exit 1
    ;;
esac

echo "✅ Deployment complete!"
