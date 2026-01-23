const express = require("express");
const app = express();
const PORT = 3000;
const authRouter = require("./routes/authRouter");

require("dotenv").config();

app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public routes
app.get("/", (req, res) => res.render("index"));
app.use(authRouter);

// protected routes (must be logged in)
app.get("/messages/new", (req, res) => res.send("show create message form"));
app.post("/messages", (req, res) => res.send("create new message"));

app.get("/join", (req, res) =>
  res.send('show "join the club" form (enter secret passcode)'),
);
app.post("/join", (req, res) =>
  res.send("verify passcode, upgrade user to member"),
);

// admin only routes
app.post("/messages/:id/delete", (req, res) =>
  res.send("delete a message (only if admin)"),
);

app.listen(PORT, () => console.log(`Application listening on port: ${PORT}`));
