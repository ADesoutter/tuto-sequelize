Tuto Sequelize
===

## Requirements

- Node.JS > 14.X 
- npm
- MySQL

**You need to create a database and a user with all privileges !**

## Installation

```sh
git clone https://github.com/jblavisse/tuto-sequelize-1.git
npm install 
cp .env.sample .env

```

Set DATABASE_URL in .env with your DB infos.

## Launch server

```sh
# Execute fixtures
node fixtures.js

node app.js
````