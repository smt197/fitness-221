# =================================================================
# Stage 1: Build & Dependencies
# =================================================================
# On utilise debian-slim qui est très stable avec Prisma
FROM node:20-slim AS base

# Installation d'OpenSSL (requis par Prisma)
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /var/www/html

COPY package*.json ./
RUN npm install

COPY . .

# Génération du client Prisma
RUN npx prisma generate

# =================================================================
# Stage 2: Production image
# =================================================================
FROM node:20-slim

# On installe openssl et curl (pour télécharger cloudflared)
RUN apt-get update -y && \
    apt-get install -y openssl curl && \
    rm -rf /var/lib/apt/lists/*

# Installation de cloudflared (Binaire Linux 64-bit)
RUN curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && \
    chmod +x /usr/local/bin/cloudflared

WORKDIR /var/www/html

COPY --from=base /var/www/html /var/www/html

# Copie et activation du script de démarrage
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 5000
ENV NODE_ENV=production

# On utilise le script d'entrée pour lancer le tunnel et l'app
CMD ["./entrypoint.sh"]

