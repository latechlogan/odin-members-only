const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", (req, res) => res.send("homepage"));

app.listen(PORT, () => console.log(`Application listening on port: ${PORT}`));
