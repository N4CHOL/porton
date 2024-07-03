FROM node:18 as base
LABEL maintainer="Javier Barrera <jbarrera@factoris.co>"

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install package.json (o sea las dependencies)
COPY package.json /usr/src/app/package.json
RUN npm install

# Instalación de Nodemon en forma Global
# Al realizarse cambios reiniciar el servidor
RUN npm install nodemon -g

# add app
COPY . /usr/src/app/
COPY ./src/assets/img /usr/src/app/src/assets/img

EXPOSE 3100

FROM base as production

ENV NODE_PATH=./build

RUN pwd

RUN ls

RUN npm run clean

RUN npm run build
