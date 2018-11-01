FROM node:10-alpine AS build
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run docker --production

FROM nginx:alpine
EXPOSE 80
RUN sed -i \
  '/index.htm/a try_files $uri $uri/ /index.html =404;' \
  /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
