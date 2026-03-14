# =============================================================================
# BUILD STAGE
# =============================================================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Set build-time environment variable
ARG REACT_APP_BACKEND_REST_API_URL
ENV REACT_APP_BACKEND_REST_API_URL=${REACT_APP_BACKEND_REST_API_URL}

# Build the application
RUN npm run build

# =============================================================================
# RUNTIME STAGE
# =============================================================================
FROM nginx:alpine

LABEL maintainer="Zufar Sunagatov" \
      description="Shorty URL Frontend - React Application"

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
