# Angular + Nestjs Twitter Clone

This repository is an ongoing twitter clone application, featuring an event driven microservice architecture managed in an [Nx](https://nx.dev) workspace.This project was using [Nx](https://nx.dev).

## user stories

- A user can be authenticated via google
- A user can be authenticated via email and password
- A user makes a post
- A user can subscribe to other users
- A user has a viewable list of their own posts
- A user can chat with other users or a group of users
- A user has an activity feed of those they follow's post

### This app needs to provide the following functionalities

- To create a user
- To login a user
- To get the list of user's post
- To retrieve an aggregated activity feed of posts from those they follow
- To retweet other users posts

### Technical choices

- [Angular](https://angular.io) for web-client
- [Nest](https://nestjs.com) for backend
- [MongoDB](https://www.mongodb.com/) for a NoSQL datastore
- [Mongoose](https://mongoosejs.com/) as ORM for database interaction
- [socketIO](https://socket.io/) for realtime bi-directional communications

### Services breakdown:

- API auth (user authentication and authorization)

- Api post service ( CRUD for tweets)
- Api Email service(Sending Emails)
- Api Feed service(Aggregating user activity feed)
- Api chat service (CRUD messaging)

### Sharable libraries breakdown:

- core ( decorators, guards, interfaces, utility functions, constants )
- dto ( all data transferable objects used across services)
- schemas ( contains all schemas)

### Environmental variables

- MONGO_URL //your mongodb url
- JWT_SECRET //json web token secret
- JWT_ACCESS_EXPIRES_IN //Expiry time for access token
- JWT_REFRESH_EXPIRES_IN //Expiry time for refresh token
- EMAIL_USER // smt username
- EMAIL_PASSWORD //smtp password
- EMAIL_SERVICE // smtp service
- POST_PORT = 4000
- AUTH_PORT = 4001
- USER_PORT = 4002
- GOOGLE_OAUTH_CLIENT_SECRET // google oauth client secret
- GOOGLE_OAUTH_CLIENT_ID // google oauth client id
- GOOGLE_OAUTH_REDIRECT_URI // google oauth redirect url
- CLIENT_URL // web client url

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
