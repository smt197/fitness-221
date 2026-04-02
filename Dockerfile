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

# On réinstalle openssl dans l'image finale
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --from=base /var/www/html /var/www/html

EXPOSE 5000
ENV NODE_ENV=production

CMD ["npm", "start"]
