FROM node:latest

RUN mkdir -p /srv/app/vault-server
WORKDIR /srv/app/vault-server

COPY client/package.json /srv/app/vault-server
COPY client/package-lock.json /srv/app/vault-server

RUN npm install

COPY . /srv/app/vault-server

CMD ["npm", "start"]