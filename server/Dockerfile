FROM node:latest

RUN mkdir -p /srv/app/vault-server

COPY . /srv/app/vault-server

WORKDIR /srv/app/vault-server

RUN npm install && npm test

CMD ["npm", "run", "docker"]