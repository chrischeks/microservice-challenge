## Description

- The customer service

### To run this project you need to take the following steps:

1. Install NodeJS [NodeJS](https://nodejs.org/en/).
1. A code editor [VS code] (https://code.visualstudio.com/download)
1. Clone the repository [Github] (git clone https://github.com/chrischeks/microservice-challenge.git)
1. Locate the customer subdirectory (cd microservice-challenge/customer)
1. Install the project dependencies (npm install)
1. Create a .env file at the root of the customer subdirectory and copy the environment variables in .env-example into it.
1. Run this service (npm run dev)

## USE

- After running this service and the 2 others (billing and billing-worker), you can send a POST request to (http://localhost:3000/customer/account-funding) using CURL, Postman, etc
- There's a sample payload in a root level file named .payload-example

## Project Clone

```bash
$ git clone (https://github.com/chrischeks/microservice-challenge.git)

```

## Installation

```bash
$ cd microservice-challenge/customer

$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm start
```
