# Use Node 20 LTS
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files and build TypeScript
COPY . .
RUN npx tsc

# --- Production image ---
FROM node:20-alpine

WORKDIR /app

# Copy built files and package.json
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 5000

# Run server
CMD ["node", "dist/main.js"]
