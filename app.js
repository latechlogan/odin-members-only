const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const path = require("node:path");
require("dotenv").config();

const app = express();

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION SETUP - Must come BEFORE passport middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

// PASSPORT MIDDLEWARE - Must come AFTER session setup
app.use(passport.initialize());
app.use(passport.session());

// Custom Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Public Routes
const authRouter = require("./routes/authRouter");

app.get("/", (req, res) => res.render("index"));
app.use(authRouter);

// Protected Routes (must be logged in)
app.get("/messages/new", (req, res) => res.send("show create message form"));
app.post("/messages", (req, res) => res.send("create new message"));

app.get("/join", (req, res) =>
  res.send('show "join the club" form (enter secret passcode)'),
);
app.post("/join", (req, res) =>
  res.send("verify passcode, upgrade user to member"),
);

// Admin ONLY Routes
app.post("/messages/:id/delete", (req, res) =>
  res.send("delete a message (only if admin)"),
);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Application listening on port: ${PORT}`));
