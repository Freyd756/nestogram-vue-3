## build stage
#FROM node:lts-alpine as build-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#
## production stage
#FROM node:lts-alpine as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#ENV PORT 8080
#EXPOSE $PORT
##CMD ["nginx", "-g", "daemon off;"]
#CMD [ "npm", "run", "dev"]




FROM node:lts-alpine
#FROM node:bullseye

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm i -g npm@9.6.7

RUN npm install


# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev"]




