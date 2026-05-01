# Use official Bun image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy application source code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Run the application
CMD ["bun", "run", "server.js"]