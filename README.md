# Fun Exercise #1 - encryptio
Stack includes:
- express
- prisma (open-source database toolkit, like an ORM, but they claim it's not a traditional ORM)
- SQLite (db just for quick prototyping)
- jest (for tests)

## Routes
|Method|Path|Query Params|Post Body|
|---|---|---|---|
|`GET`|`/api/information`|`id`(required), `decryption_key`(required)|none|
|`POST`|`/api/information`|none|`{'id': <id>, 'value': <valid-json>, 'encryption_key': <key>}`|

## How to set up a the project
1. clone the repo
2. set up your SQLite database (I describe the DB schema as well)
3. create a `.env` file at the `prisma` folder and add the following to the file: 
`DATABASE_URL="file:/<location of your SQLite db>"` - 
In my case it's like
`DATABASE_URL="file:/Users/myname/Downloads/information.db"`
5. `npm install`
6. `npm run start`

### Setting up the SQLite database


```sql
CREATE TABLE "information" (
	"id"	TEXT NOT NULL UNIQUE,
	"value"	TEXT NOT NULL,
	PRIMARY KEY("id")
);
```

### Running unit tests
`npm run test`
