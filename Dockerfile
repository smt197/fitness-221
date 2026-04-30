FROM node:20-slim

# Installation d'OpenSSL (requis par Prisma) et nettoyage du cache apt
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie de tout le code source (incluant entrypoint.sh)
COPY . .

# Génération du client Prisma
RUN npx prisma generate

# S'assurer que le script d'entrée est exécutable
RUN chmod +x entrypoint.sh

EXPOSE 5000
ENV NODE_ENV=production

# Lancement de l'application via le script d'entrée
CMD ["./entrypoint.sh"]
