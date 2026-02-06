#!/bin/bash
# Setup domain and SSL for elitepmprompts.com

VPS_HOST="root@141.136.44.168"
DOMAIN="elitepmprompts.com"

echo "🌐 Setting up domain: $DOMAIN"

ssh $VPS_HOST << 'ENDSSH'
# Install nginx and certbot if not present
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx

# Create nginx config for elitepmprompts.com
cat > /etc/nginx/sites-available/elitepmprompts.com << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name elitepmprompts.com www.elitepmprompts.com;

    location / {
        proxy_pass http://127.0.0.1:3020;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/elitepmprompts.com /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx

echo "✅ Nginx configured"

# Get SSL certificate
echo "🔒 Obtaining SSL certificate..."
certbot --nginx -d elitepmprompts.com -d www.elitepmprompts.com --non-interactive --agree-tos --email admin@elitepmprompts.com --redirect

echo "✅ SSL certificate installed"

# Show status
systemctl status nginx --no-pager

echo ""
echo "🎉 Domain setup complete!"
echo "Your site should now be accessible at:"
echo "  https://elitepmprompts.com"
echo "  https://www.elitepmprompts.com"
ENDSSH
