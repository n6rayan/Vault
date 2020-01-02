# Vault
Centralised banking application allowing you to register all your accounts in one place and view all the information.

## Technical Information

### Routes

#### API (under /api)

- `GET /healthcheck` : Shows the app is up with a basic JSON respose including current date and time.
- `POST /login` : Takes a JSON body. This then returns you a JWT which acts as a session.
- `GET /current-user` : Checks the JWT cookie and validates it to make sure the user is still authenticated.
- `GET /logout` : Logs the user out by clearing the JWT cookie.
- `POST /user` : Takes a JSON body. Allows you to create a user.

#### Starling Bank (under /api/starling)

- `GET /oauth/login` : Redirects to the Starling API to login via OAuth.
- `GET /oauth/redirect` : Used by the Starling API to redirect back to the Vault app.
- `GET /accounts` : Retrieves a list of the users accounts from the Starling API.
- `GET /statement/:accountId` : Downloads a statement from the current month to date from the specified account ID.

#### Prequesites
`Node.js`, `npm`, `MongoDB`, `Docker`

#### Host Entry
You will need to add a host entry into your `/etc/hosts/` file for this app to work correctly. This is due to the fact that localhost URL's cannot be used as the valid redirect URL during the OAuth transaction. Please add the following host entry: `127.0.0.1 vault.io`

#### Development Environment (Docker)
You will need docker setup on your environment to be able to run this through Docker. I suggest coming [here](https://hub.docker.com/search/?type=edition&offering=community) and installing the community edition. Then you can simply do:

- Run `docker-compose build`
    - NOTE: The first build will take the longest due to packages being pulled in etc. Subsequent builds should be a lot faster.
- Run `docker-compose up` or `docker-compose up -d` to run the logging in detached mode.
- Visit `http://vault.io:3000/` to ensure that the app is up and running.

#### Development Environment
You will need Node.js, npm and MongoDB all up and running on your local environment. In terms of the MongoDB config in the config/default.json, feel free to modify the connection string to what you have setup with your version of MongoDB. Then you can simply do the following:

- Run `npm install`
- Run `npm start`
- Visit `http://vault.io:3001/` to ensure that the app spun up correctly.

### Running Tests
Run the tests to make sure everything is okay. To do this simply run: `npm test`.

To test the API once it is spun up, you can use the following curl command to create a user in the database:

```curl -H "Content-Type: application/json" -X POST http://vault.io:3001/user -d '{ "username": "username", "password": "password", "phone": "07123456789", "email": "username@email.com", "name": "User Name" }'```
