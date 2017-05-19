FROM node:6-alpine

RUN mkdir -p /apidoc
WORKDIR /apidoc

RUN npm install -g apidoc

ENTRYPOINT ["apidoc"]
