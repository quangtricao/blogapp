# Blogapp

A blogapp application illustrates User administration: user can register an account, login and logout

## Demo Link

The deployed application is hosted at: https://still-surf-6512.fly.dev

## Table of Contents

- [Introduction](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)

## Introduction

In the application, user can login with their account, register a new account and logout. The login functionality is implemented with the token-based authentication.

Each blog is associated with the user who created it so that only that user can delete it. Other users can only "like" the blog.

Frontend is initialized with the create-react-app tool, the application's state is managed by Redux library.

In backend, the Express library is used to ease server-side development with NodeJS. Generating Password hashes happens with the bcrypt package
while the jsonwebtoken library enables developers to generate JSON web tokens. To send the token from the browser to the server, the Authorization header is used, in this case, The Bearer scheme is used.

MongoDB serves as database for the application. The project use the Mongoose library to make interacting with MongoDB much easier.

## Technologies

### Frontend

dependencies:
* axios: ^1.3.4
* redux: ^4.2.1
* @reduxjs/toolkit: ^1.9.3
* react-redux: ^8.0.5
* react-router-dom: ^6.8.2

### Backend

dependencies:
* bcrypt: ^5.1.0
* cors: ^2.8.5
* dotenv: ^16.0.3
* express: ^4.18.2
* express-async-errors: ^3.1.1
* jsonwebtoken": ^9.0.0
* mongoose: ^7.0.0
* cross-env: ^7.0.3

devDependencies:
* nodemon: ^2.0.21
* eslint: ^8.35.0
* jest: ^29.4.3
* nodemon: ^2.0.21
* supertest: ^6.3.3

## Installation

Clone the project with the command:

```sh
git clone https://github.com/quangtricao/phonebook.git
```

In both client and server folders, install each folder's dependencies with the command:

```sh
npm install
```

Launch the application

```sh
npm start
```

Start MongoDB server

```sh
npm run dev
```

### Run backend/frontend tests

```sh
npm test
```

Specify the tests that need to be run as parameters of npm test <br/>
Only runs the tests found in the tests/blog_api.test.js

```sh
npm test -- tests/blogs_api.test.js
```

Or runs tests with a specific name (or tests that contains parameters in their name)

```sh
npm test -- -t "test's name"
```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.