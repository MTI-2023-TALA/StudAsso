FROM node:lts-alpine
WORKDIR /app
COPY ./ .
ENV PORT=3334
EXPOSE ${PORT}
RUN npm install
RUN npm install reflect-metadata tslib rxjs hbs
CMD node ./main.js