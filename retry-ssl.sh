#!/bin/bash
# Retry SSL certificate after DNS propagation

VPS_HOST="root@141.136.44.168"
DOMAIN="elitepmprompts.com"

echo "🔍 Checking DNS resolution..."
RESOLVED_IP=$(ssh $VPS_HOST "host $DOMAIN | head -1 | awk '{print \$NF}'")
echo "Domain resolves to: $RESOLVED_IP"

if [ "$RESOLVED_IP" != "141.136.44.168" ]; then
    echo "❌ DNS not yet pointing to VPS (141.136.44.168)"
    echo "Current resolution: $RESOLVED_IP"
    echo "Please update DNS A record and try again."
    exit 1
fi

echo "✅ DNS is correct! Getting SSL certificate..."

ssh $VPS_HOST << 'ENDSSH'
certbot --nginx -d elitepmprompts.com -d www.elitepmprompts.com --non-interactive --agree-tos --email admin@elitepmprompts.com --redirect

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate installed!"
    echo ""
    echo "🎉 Your site is now live at:"
    echo "  https://elitepmprompts.com"
    echo "  https://www.elitepmprompts.com"
else
    echo "❌ SSL certificate failed. Check /var/log/letsencrypt/letsencrypt.log"
fi
ENDSSH
