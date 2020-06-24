# Thingful Server

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb thingful`, `createdb thingful-test`
- Use postgres as a user
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`



## Sample Data

- To seed the database for development: `psql -U postgres -d thingful -a -f seeds/seed.thingful_tables.sql`
- To clear seed data: `psql -U thingful -d postgres -a -f seeds/trunc.thingful_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`
