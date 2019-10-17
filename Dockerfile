# Dockerfile for apidoc
FROM node:12-alpine

LABEL org.label-schema.name="apidoc" \
    org.label-schema.description="apidoc Docker image" \
    org.label-schema.url="http://apidocjs.com/" \
    org.label-schema.vcs-url="https://github.com/apidoc/apidoc" \
    org.label-schema.maintainer="rottmann@inveris.de" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.docker.cmd="docker run --rm -v $(pwd):/home/node/apidoc apidoc/apidoc -o outputdir -i inputdir"

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

USER node

RUN mkdir -p /home/node/apidoc

WORKDIR /home/node/apidoc

RUN npm install --only=prod -g apidoc

ENTRYPOINT ["apidoc"]
