# NEXTJS PRODUCTION

# Stage 1: Build Stage

# Use the official Node 20 Alpine image as the base image for the build stage
FROM node:20-alpine AS build

# Install build dependencies (curl, libpng-dev, vips-dev, etc.)
RUN apk update && \
    apk add --no-cache \
    curl \
    libpng-dev \
    vips-dev \
    git \
    && rm -rf /var/cache/apk/*

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm install --production --legacy-peer-deps

# Copy the rest of the application code
COPY ./ ./

# Build the Next.js app
RUN npm run build

# Stage 2: Production Stage

# Use a lightweight Node.js image for the production runtime
FROM node:20-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Install only necessary runtime dependencies (no build tools)
RUN apk update && \
    apk add --no-cache \
    curl \
    libpng-dev \
    vips-dev \
    && rm -rf /var/cache/apk/*

# Copy only the build output and production dependencies from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Expose the port for the app (Next.js default port is 3000)
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]