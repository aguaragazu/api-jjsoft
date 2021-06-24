FROM node:alpine

# RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash
RUN apk add --no-cache --virtual .build-deps \
    ca-certificates \
    wget \
    tar && \
    cd /usr/local/bin && \
    wget https://yarnpkg.com/latest.tar.gz && \
    tar zvxf latest.tar.gz && \
    ln -s /usr/local/bin/dist/bin/yarn.js /usr/local/bin/yarn.js && \
    apk del .build-deps

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh 

RUN apk --no-cache add shadow && \
    usermod -u 1001 node && \
    groupmod -g 1001 node

RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn global add nodemon typescript

EXPOSE 5000

# CMD ["nodemon"]