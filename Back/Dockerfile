FROM node:16-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD npm run start