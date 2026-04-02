# =================================================================
# Stage 1: Build & Dependencies (Prisma Client Generation)
# =================================================================
FROM node:20-alpine AS base

WORKDIR /var/www/html

# Copy package definition and lock file
COPY package*.json ./

# Install all dependencies (including devDependencies for Prisma generation)
RUN npm install

# Copy project source code
COPY . .

# Generate Prisma Client (crucial for runtime)
RUN npx prisma generate

# =================================================================
# Stage 2: Production image
# =================================================================
FROM node:20-alpine

WORKDIR /var/www/html

# Copy everything from the base stage
# (In a more optimized setup, we could copy only the necessary files)
COPY --from=base /var/www/html /var/www/html

# Expose the application port (matching the current .env)
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# The start command (runs the project using node)
CMD ["npm", "start"]
