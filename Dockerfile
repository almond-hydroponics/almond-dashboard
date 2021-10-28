FROM ubuntu:18.04

# Install Node.js
RUN apt-get update
RUN apt-get -y install curl
RUN apt-get -y install sudo
RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt-get install -y build-essential
RUN apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update
RUN sudo apt-get install yarn

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN yarn install --immutable
RUN yarn build

EXPOSE 3001
CMD ["yarn", "start"]

## Install dependencies only when needed
#FROM node:14.16.0-alpine AS builder
## Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
## set labels
#LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
#LABEL application="almond"
#RUN apk add --no-cache libc6-compat
#WORKDIR /app
#COPY . .
#RUN yarn install --immutable
#RUN yarn build
#
## Production image, copy all the files and run next
#FROM node:14.16.0-alpine AS runner
#WORKDIR /app
#ENV NODE_ENV production
## Add user nextjs
#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001
## You only need to copy next.config.js if you are NOT using the default configuration
## COPY --from=builder /app/next.config.js ./
#COPY --from=builder /app/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package.json ./package.json
## Use user nextjs to run the app
#USER nextjs
#EXPOSE 3000
## Next.js collects completely anonymous telemetry data about general usage.
## Learn more here: https://nextjs.org/telemetry
## Uncomment the following line in case you want to disable telemetry.
## ENV NEXT_TELEMETRY_DISABLED 1
#CMD ["yarn", "start"]
