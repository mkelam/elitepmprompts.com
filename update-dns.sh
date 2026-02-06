#!/bin/bash
# Update DNS A records for elitepmprompts.com
# This script provides instructions and checks DNS status

DOMAIN="elitepmprompts.com"
TARGET_IP="141.136.44.168"

echo "======================================"
echo "DNS Update Instructions"
echo "======================================"
echo ""
echo "Your domain: $DOMAIN"
echo "Target IP:   $TARGET_IP"
echo ""
echo "Current DNS Resolution:"
echo "-----------------------"

# Check current DNS
CURRENT_IP=$(nslookup $DOMAIN 2>/dev/null | grep -A1 "Name:" | grep "Address" | awk '{print $2}' | head -1)
if [ -z "$CURRENT_IP" ]; then
    CURRENT_IP=$(host $DOMAIN 2>/dev/null | grep "has address" | awk '{print $4}' | head -1)
fi

echo "  $DOMAIN -> ${CURRENT_IP:-'Not resolved'}"

WWW_IP=$(nslookup www.$DOMAIN 2>/dev/null | grep -A1 "Name:" | grep "Address" | awk '{print $2}' | head -1)
if [ -z "$WWW_IP" ]; then
    WWW_IP=$(host www.$DOMAIN 2>/dev/null | grep "has address" | awk '{print $4}' | head -1)
fi

echo "  www.$DOMAIN -> ${WWW_IP:-'Not resolved'}"
echo ""

if [ "$CURRENT_IP" = "$TARGET_IP" ]; then
    echo "✅ DNS is correctly configured!"
    echo ""
    echo "You can now run: bash retry-ssl.sh"
else
    echo "❌ DNS needs to be updated"
    echo ""
    echo "======================================"
    echo "MANUAL STEPS REQUIRED"
    echo "======================================"
    echo ""
    echo "1. Log in to your domain registrar (where you bought the domain)"
    echo ""
    echo "2. Find DNS Management or DNS Settings"
    echo ""
    echo "3. Update or create these A records:"
    echo ""
    echo "   ┌──────────┬──────────┬─────────────────┐"
    echo "   │ Type     │ Host     │ Value           │"
    echo "   ├──────────┼──────────┼─────────────────┤"
    echo "   │ A        │ @        │ $TARGET_IP │"
    echo "   │ A        │ www      │ $TARGET_IP │"
    echo "   └──────────┴──────────┴─────────────────┘"
    echo ""
    echo "4. Save the changes"
    echo ""
    echo "5. Wait 5-30 minutes for DNS propagation"
    echo ""
    echo "6. Run this script again to verify, then run:"
    echo "   bash retry-ssl.sh"
    echo ""
    echo "======================================"
    echo "COMMON REGISTRARS"
    echo "======================================"
    echo ""
    echo "• GoDaddy:     My Products > DNS > Manage"
    echo "• Namecheap:   Domain List > Manage > Advanced DNS"
    echo "• Cloudflare:  Select domain > DNS > Records"
    echo "• Google:      My Domains > DNS"
    echo "• HostGator:   Domains > DNS Zone Editor"
    echo ""
fi

echo ""
echo "======================================"
echo "CHECK DNS PROPAGATION"
echo "======================================"
echo ""
echo "Use these tools to check if DNS has propagated:"
echo "• https://dnschecker.org/#A/$DOMAIN"
echo "• https://www.whatsmydns.net/#A/$DOMAIN"
echo ""
