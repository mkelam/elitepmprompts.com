#!/bin/bash
# Deploy PM-Nexus to VPS

VPS_HOST="root@141.136.44.168"
APP_DIR="/var/www/elitepmprompts.com"

echo "🚀 Deploying PM-Nexus to VPS..."

ssh $VPS_HOST << 'ENDSSH'
cd /var/www/elitepmprompts.com || { mkdir -p /var/www/elitepmprompts.com && cd /var/www/elitepmprompts.com && git clone https://github.com/mkelam/elitepmprompts.com.git .; }
echo "📥 Pulling latest changes..."
git pull origin main
echo "📦 Installing dependencies..."
npm install
echo "🔨 Building application..."
npm run build
echo "🔄 Restarting application..."
pm2 restart elitepmprompts || pm2 start http-server --name "elitepmprompts" -- out -p 3020
echo "✅ Deployment complete!"
ENDSSH
