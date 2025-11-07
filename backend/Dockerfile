FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production  # production deps only

COPY . .

EXPOSE 5001

ENV NODE_ENV=production

# Use production start script (not dev)
CMD ["npm", "start"]