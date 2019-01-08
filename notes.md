# Notes

## JWT

The current HWYt expiration time is 3 days - is this sutaible?

- What is the downside of ahving mulitple try/catch blocks
  For example, this is not accurately catching the expired JWT.
- What is modules.export - using `export const` for each function declaration is tedious when you're importing multiple files.

`
CREATE TABLE IF NOT EXISTS ingredients (
ingredienid UUID PRIMARY KEY,
name VARCHAR(255),
servingsize INTEGER
servingunit VARCHAR(64),

);`
