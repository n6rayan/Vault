FROM node:latest

RUN mkdir -p /srv/app/vault-client

COPY . /srv/app/vault-client

WORKDIR /srv/app/vault-client

RUN npm install

CMD ["npm", "start"]