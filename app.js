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

// Make current user available to all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Public Routes
const authRouter = require("./routes/authRouter");
const messagesRouter = require("./routes/messagesRouter");
const messagesController = require("./controllers/messagesController");
const membershipController = require("./controllers/membershipController");
const { ensureAuthenticated } = require("./middleware/auth");

app.get("/", messagesController.index);
app.use(authRouter);
app.use("/messages", messagesRouter);

app.get("/join", ensureAuthenticated, membershipController.joinGet);
app.post("/join", ensureAuthenticated, membershipController.joinPost);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Application listening on port: ${PORT}`));
