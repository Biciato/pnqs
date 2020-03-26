# build environment
FROM node:12.2.0-alpine as build
WORKDIR /srv/app/client
ENV PATH /srv/app/client/node_modules/.bin:$PATH
COPY package.json /srv/app/client/package.json
RUN npm install --silent
RUN npm install @vue/cli@3.7.0 -g
COPY . /srv/app/client
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /srv/app/client/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]