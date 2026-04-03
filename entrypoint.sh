#!/bin/sh

# 1. Run Prisma migrations
echo "--- Running Prisma Migrations ---"
npx prisma migrate deploy

# 2. Start Cloudflare Tunnel
if [ -n "$CLOUDFLARE_TUNNEL_TOKEN" ]; then
    echo "--- Starting Cloudflare Tunnel with Token ---"
    cloudflared tunnel --no-autoupdate run --token "$CLOUDFLARE_TUNNEL_TOKEN" &
else
    echo "--- Starting Cloudflare Tunnel (Anonymous Quick Tunnel) ---"
    cloudflared tunnel --url http://localhost:5000 &
fi

# 3. Start the Application
echo "--- Starting Node.js Application ---"
npm start
