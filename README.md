
Data layer
- database `SQLite` (for proof of concept purposes only)

```sql
CREATE TABLE "information" (
	"id"	TEXT NOT NULL UNIQUE,
	"value"	TEXT NOT NULL,
	PRIMARY KEY("id")
);
```
