# quantum-auth

quantum-auth is a framework for a basic user authentication and authorization API.

## Run locally

Run `$ npm install` to start.

### Create `.env` file

Git ignores the `.env` file by default. **Create** an `/.env` file at the root level of the repo. Add the following vairables:

`DATABASE_URL:postgres://<username>@127.0.0.1:5432/qauthdb`

### Run dev server with `$ npm run start-dev`

Run to start the dev server on port `:5151`.
