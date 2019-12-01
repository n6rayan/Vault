FROM node:latest

RUN mkdir -p /srv/app/vault-server

RUN pwd
RUN ls -la

COPY . /srv/app/vault-server

WORKDIR /srv/app/vault-server

RUN npm install

CMD ["npm", "start"]