# Stage 1: Build the NestJS application
FROM node:22

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Expose the port your NestJS app listens on
EXPOSE 3000

# Run the NestJS application
CMD ["npm", "run", "start:prod"]

