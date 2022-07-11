## Description

- The customer service

### To run this project you need to take the following steps:

- This project consists of three microservices which needs to be started separately

1. Install NodeJS [NodeJS](https://nodejs.org/en/).
1. A code editor [VS code] (https://code.visualstudio.com/download)
1. Clone the repository [Github] (git clone https://github.com/chrischeks/microservice-challenge.git)
1. Locate the subdirectories (cd microservice-challenge/customer, cd microservice-challenge/billing, cd microservice-challenge/billing-worker)
1. Install the project dependencies in each of the services (npm install)
1. Create a .env file at the root of each subdirectory, then copy and paste the environment variables in .env-example into it.
1. Run each service (npm run dev)

## USE

- After running the 3 services (customer, billing and billing-worker), you can send a POST request to (http://localhost:3000/customer/account-funding) using CURL, Postman, etc
- There's a sample payload in a root level file named /microservice-challenge/customer/.payload-example

## Project Clone

```bash
$ git clone (https://github.com/chrischeks/microservice-challenge.git)

```

## Installation

```bash
$ cd microservice-challenge/customer

$ npm install

$ cd microservice-challenge/billing

$ npm install

$ cd microservice-challenge/billing-worker

$ npm install
```

## Running the app

```bash
#Chnage directory
cd microservice-challenge/customer

# development
$ npm run dev

# production mode
$ npm start


#Chnage directory
cd microservice-challenge/billing

# development
$ npm run dev

# production mode
$ npm start


#Chnage directory
cd microservice-challenge/billing-worker

# development
$ npm run dev

# production mode
$ npm start
```

## Note

- The microservices run best seperately on an actual machine, time constriant couldn't allow me optimise the docker side
