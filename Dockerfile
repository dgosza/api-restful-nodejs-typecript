FROM node:alpine
RUN apk add --no-cache bash

USER daemon
WORKDIR /home/node/app
