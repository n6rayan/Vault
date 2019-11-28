FROM node:latest

RUN mkdir -p /srv/app/vault-client
WORKDIR /srv/app/vault-client

COPY client/package.json /srv/app/vault-client
COPY client/package-lock.json /srv/app/vault-client

RUN npm install

COPY . /srv/app/vault-client

CMD ["npm", "start"]