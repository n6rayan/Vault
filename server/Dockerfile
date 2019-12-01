FROM node:latest

RUN mkdir -p /srv/app/vault-server

COPY server/package.json /srv/app/vault-server
COPY server/package-lock.json /srv/app/vault-server

WORKDIR /srv/app/vault-server

RUN npm install

COPY . /srv/app/vault-server

CMD ["npm", "start"]