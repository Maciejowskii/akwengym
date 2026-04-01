# Stage 1: Build the frontend
FROM node:20-slim AS builder

WORKDIR /app

# Install build dependencies for better-sqlite3 (if needed on slim)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-slim

WORKDIR /app

# Re-install build dependencies for better-sqlite3 (native modules)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy only the necessary files
COPY package*.json ./
RUN npm install --omit=dev

# Copy the server code and build artifacts
COPY server/ ./server/
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000
ENV DB_PATH=/app/data/blog.db

# Create data directory for SQLite persistence
RUN mkdir -p /app/data

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]
