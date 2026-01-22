const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public routes
app.get("/signup", (req, res) => res.send("show signup form"));
app.post("/signup", (req, res) => res.send("create new user"));

app.get("/login", (req, res) => res.send("show login form"));
app.post("/login", (req, res) => res.send("authenticate user"));

app.get("/logout", (req, res) => res.send("log user out"));

app.get("/", (req, res) =>
  res.send("show all messages (hide authors for non-members)"),
);

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
