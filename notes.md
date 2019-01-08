# Notes

## JWT

The current HWYt expiration time is 3 days - is this sutaible?

- What is the downside of ahving mulitple try/catch blocks
  For example, this is not accurately catching the expired JWT.
- What is modules.export - using `export const` for each function declaration is tedious when you're importing multiple files.
- What about storing the postgres tablenames in camelCase - it would save a significant processing time. What is the downside. I know that postgres "doesn't like casing". Is this a metter of opinion - is this just lazy DBAs. Does it just mean including quotes around all of the table names and/or columns.
- SO it VARCHAR 255 is 256 with one bit for indexing - does that mean that everything else should follow this convention. E.g., 128 should be 127.

`
CREATE TABLE IF NOT EXISTS ingredients (
ingredienid UUID PRIMARY KEY,
name VARCHAR(255),
servingsize INTEGER
servingunit VARCHAR(64),

);`
