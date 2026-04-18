# Node.js base image
FROM node:18-alpine

WORKDIR /app

# Dependencies install karein
COPY package*.json ./
RUN npm install

# Pura frontend code copy karein
COPY . .

# Next.js build karein
RUN npm run build

# Frontend ko run karein
CMD ["npm", "start"]