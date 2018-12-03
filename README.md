# quantum-auth

quantum-auth is a framework for a basic user authentication and authorization API.

## Run locally

Run `$ npm install` to start.

### Create `.env` file

Git ignores the `.env` file by default. **Create** an `/.env` file at the root level of the repo. Add the following vairables:

```
DATABASE_URL=postgres://<username>@127.0.0.1:5432/qauthdb
SECRET=someSecretCode
```

#### Using AWS?

Use these variables instead of `DATABASE_URL`

```
RDS_HOSTNAME=<instance>.us-east-1.rds.amazonaws.com
RDS_PORT=5432
RDS_DB_NAME=<dbname>
RDS_USERNAME=<dbusername>
RDS_PASSWORD=<password>
```

### Run dev server with `$ npm run start-dev`

Run to start the dev server on port `:5151`.
