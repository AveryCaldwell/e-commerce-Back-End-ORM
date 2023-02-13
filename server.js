const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

// TO DO:
// GIVEN a functional Express.js API
// WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
// THEN I am able to connect to a database using Sequelize

// TO DO:
// WHEN I enter schema and seed commands
// THEN a development database is created and is seeded with test data

//TO DO:
// WHEN I enter the command to invoke the application
// THEN my server is started and the Sequelize models are synced to the MySQL database

// TO DO:
// WHEN I open API GET routes in Insomnia for categories, products, or tags
// THEN the data for each of these routes is displayed in a formatted JSON

// TO DO:
// WHEN I test API POST, PUT, and DELETE routes in Insomnia
// THEN I am able to successfully create, update, and delete data in my database

// TODO: Sync Sequelize to the Database on Server Start
// Create the code needed in server.js to sync the Sequelize models to the MySQL database on server start.
