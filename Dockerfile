FROM node:20-alpine

WORKDIR app

COPY . .

COPY package*json ./

COPY --chown=node:node . .

RUN npm ci && npm run build

USER node

CMD ["node", "dist/main.js"]

