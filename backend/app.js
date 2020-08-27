const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const parser = require("body-parser");
const cors = require("cors");
const path = require("path");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

// Connect database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(parser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

// Routes
// app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));


