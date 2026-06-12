FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src/ ./src/

# Data directory for JSON config persistence
RUN mkdir -p /app/data

VOLUME ["/app/data"]

CMD ["node", "src/index.js"]
