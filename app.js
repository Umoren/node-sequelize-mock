const express = require("express");
const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
const router = require('./router/index');
const bodyParser = require("body-parser");


const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig);


app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

async function syncModels() {
    try {
        await sequelize.sync();
        console.log("Models have been synchronized with the database.");
    } catch (error) {
        console.error("Unable to sync models with the database:", error);
    }
}

syncModels();

testConnection();


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
