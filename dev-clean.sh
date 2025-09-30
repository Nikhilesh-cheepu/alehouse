#!/bin/bash

# Clean development script for Alehouse website
# This prevents the recurring runtime error by ensuring clean state

echo "🧹 Cleaning development environment..."

# Kill all Next.js processes
echo "Stopping all Next.js processes..."
pkill -f "next dev" 2>/dev/null || true

# Remove build cache
echo "Removing build cache..."
rm -rf .next 2>/dev/null || true

# Remove node cache
echo "Removing node cache..."
rm -rf node_modules/.cache 2>/dev/null || true

# Wait a moment for processes to fully stop
sleep 2

echo "✅ Environment cleaned!"
echo "🚀 Starting development server..."

# Start fresh development server
npm run dev












