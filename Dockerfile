## 1. BUILD STAGE
FROM node:14.15.0 AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

# Set non-root user and folder
USER node
ENV APP_HOME=/home/node/app
RUN mkdir -p $APP_HOME && chown -R node:node $APP_HOME
WORKDIR $APP_HOME
# Copy source code (and all other relevant files)
COPY --chown=node:node . ./
RUN yarn install --frozen-lockfile
# Build code
RUN yarn build

## 2. RUNTIME STAGE
FROM node:14.15.0-alpine
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init
# Set non-root user and expose port 3000
USER node
EXPOSE 3000
ENV APP_HOME=/home/node/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
# Copy dependency information and install production-only dependencies
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
# Copy results from previous stage
COPY --chown=node:node --from=build $APP_HOME/dist ./dist
COPY --chown=node:node tsconfig.json tsconfig.paths.json ./
COPY package.json  server.js app.js  ./
# Run app when the container launches
CMD ["dumb-init", "node", "server.js"]
