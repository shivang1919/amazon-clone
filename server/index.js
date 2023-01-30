require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./src/db/conn");
const cookieParser = require("cookie-parser");

const Products = require("./src/models/productsSchema");
const DefaultData = require("./src/defaultdata");
const cors = require("cors");
const router = require("./src/routes/router");


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = 8005;
app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});
DefaultData();