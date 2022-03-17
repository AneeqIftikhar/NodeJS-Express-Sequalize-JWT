require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require("cors");


const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions)); //parse requests of content-type - application/json
app.use(express.json()); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

//db.sequelize.sync();//production
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use('/api',routes);

app.listen(process.env.PORT | '3000',() => {

    console.log(`Server is running on port: ${process.env.PORT | '3000'}`);
});