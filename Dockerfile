# Builder Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files 
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build


# Production Stage
FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production

# Optimize Node.js for memory constrained environments (Render Free Tier = 512MB)
ENV NODE_OPTIONS="--max-old-space-size=460"

WORKDIR /app

# Copy package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy build artifacts from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist


# Expose application port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD node -e "require('net').createConnection(5001, 'localhost')" || exit 1

# Start application 
CMD ["node", "dist/src/index.js"]
