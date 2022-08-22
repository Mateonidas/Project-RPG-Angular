##stage 1
#FROM node:latest as node
#WORKDIR /app
#COPY . .
#RUN npm install --force
#RUN npm run build --prod
#
##stage 2
#FROM nginx:alpine
#COPY --from=node /app/dist/Project-RPG-Angular /etc/nginx/html/
#
#EXPOSE 49153 80

#FROM node:latest
#
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app
#COPY package.json /usr/src/app
#RUN npm install --force
#RUN npm install -g angular-cli
#COPY . /usr/src/app
#
#EXPOSE 4200 49153
#
#CMD [ "npm", "start" ]

FROM node:latest AS build
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install --force
RUN npm run build --prod


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
#COPY --from=build /dist/src/app/dist/my-docker-angular-app /usr/share/nginx/html
COPY --from=build /dist/src/app/dist/Project-RPG-Angular /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
