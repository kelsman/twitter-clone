# use offical lightweight image

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./dist/apps/auth .

ENV PORT=4001

EXPOSE ${PORT}

# Install dependencies.
RUN yarn install --production



# dependencies that nestjs needs
RUN yarn add reflect-metadata tslib rxjs @nestjs/platform-express

COPY . .

# Run the server on container start up.
CMD ["node", "dist/apps/auth/main"]


