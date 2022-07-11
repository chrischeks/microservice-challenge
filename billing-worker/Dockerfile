# Common build stage
FROM node:16.16.0-alpine3.15 as common-build-stage

COPY . ./billing-worker-service

WORKDIR /billing-worker-service

RUN npm install

EXPOSE 3003

# Dvelopment build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
