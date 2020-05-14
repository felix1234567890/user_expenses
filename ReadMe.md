## Instructions

1.First clone this repo to use it locally with this command in your terminal:

### `git clone <projectName>`

2.Enter into the project with :

### `cd <projectName>`

3.Install all the dependencies with:

### `npm install`

4.Open `ormconfig.json` and change values for user, password and database

5.Run the migration to seed users with: `ts-node ./node_modules/typeorm/cli.js migration:run`

6.Run the project with:

### `npm start`

7.Open GraphQL playground on `http://localhost:4000`
