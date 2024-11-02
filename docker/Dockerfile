FROM node:16.18.1-alpine as build

WORKDIR /app

ARG REACT_APP_API_URL

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . ./

RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./docker/scripts/reemplazo.sh /
RUN chmod +x /reemplazo.sh

ENTRYPOINT ["/reemplazo.sh"]

EXPOSE 80
