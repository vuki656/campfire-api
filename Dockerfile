FROM node:12.18.4-alpine

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 8080

CMD ["coc-docker", "coc-docker"]
