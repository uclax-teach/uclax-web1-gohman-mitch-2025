# NEXTJS DEV

# Use the official Node 20 Alpine image as the base image
FROM node:20-alpine AS node

# Install OS dependencies (curl, vim, libpng-dev, vips-dev, and git)
# The 'vips-dev' package is already correct for Alpine, no need for 'libvips-dev'
RUN apk update && \
    apk add --no-cache \
    curl \
    vim \
    libpng-dev \
    vips-dev \
    git \
    && rm -rf /var/cache/apk/*

# NPM needs a writable cache folder, so we create and configure it
RUN mkdir /tmp/npm && \
    chmod 2777 /tmp/npm && \
    chown 1000:1000 /tmp/npm && \
    npm config set cache /tmp/npm --global

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache for npm install
COPY package*.json ./

# Clean install dependencies (only the ones specified in package.json)
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY ./ ./

# Expose port 3000 for the Next.js dev server
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]