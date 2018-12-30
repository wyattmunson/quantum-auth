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

### Run DB migration

When running for the first time, you'll likely need to seed the database. If you're unsure, run the migration.

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

## Endpoints

### `POST /api/v1/users`

Create a user

Request payload:

```json
{
  "email": "valid@email.com",
  "password": "notNull",
  "firstName": "notRequired",
  "lastName": "notRequired"
}
```

Response List:

- Success - 201
- 400 Bad request - not a valid email
- 400 Bad request - email or password not provided
- 400 Bad request - email already exists
- 404 Not found - bad email and/or password

### `POST /api/v1/users/login`

Login and get JWT.

Request payload:

```json
{
  "email": "valid@email.com",
  "password": "notNull"
}
```

Response list:

- 200 OK - Returns JWT
- 400 Bad request - not a valid email
- 400 Bad request - email or password not provided
- 404 Not found - bad email and/or password

### `GET /api/v1/users/me`

Header:

`x-access-token: <TOKEN>`

Request payload: n/a

Response payload:

```json
{
  "userid": "17485ec9-fe02-42a8-a75f-499f936cb8f7",
  "email": "greg@benish.com",
  "firstname": null,
  "lastname": null,
  "createddate": "2018-12-28T03:33:17.488Z",
  "modifieddate": null
}
```
