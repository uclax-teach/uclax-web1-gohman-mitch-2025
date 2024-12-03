# FRONTEND

# Alpine Linux, a lightweight Linux distribution primarily designed for resource efficiency, security, and simplicity.
FROM node:20.11.1-alpine3.19 AS node

# Install OS dependencies
# libvips-dev is replaced with vips-dev because Alpine Linux uses a different package naming convention.
RUN apk update && \
    apk add --no-cache \
    curl \
    vim \
    g++ \
    make \
    libpng-dev \
    vips-dev

# NPM needs a cache folder that is writeable
RUN mkdir /tmp/npm && \
    chmod 2777 /tmp/npm && \
    chown 1000:1000 /tmp/npm && \
    npm config set cache /tmp/npm --global

# Set working directory in container
WORKDIR /app

# Copy app to working directory
COPY ./ ./

# Clean Install Dependencies
RUN rm -rf ./node_modules
RUN npm install

# Need to expose port to match internal port
ARG PORT
EXPOSE ${PORT}
