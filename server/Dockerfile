# Only needed for self-hosting (see ../compose.yml). Most hosts in the
# README (Render, Railway, Fly.io) build straight from server/ without this.
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/index.js"]
