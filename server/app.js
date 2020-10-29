const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const connectDB = require('./config/database');

// Load config
dotenv.config();

// Connect database
connectDB();

// Initialize server
const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Public path
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
// app.use('/api/courses', require('./routes/course'));
// app.use('/api/quizzes', require('./routes/quiz'));
// app.use('/api/questions', require('./routes/question'));
// app.use('/api/papers', require('./routes/paper'));
// app.use('/api/categories', require('./routes/category'));
// app.use('/api/tags', require('./routes/tag'));

app.get('/', function (req, res) {
  res.render('index');
});

// Error handle
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

app.use(function (req, res, next) {
  res.status(404).send({ message: 'Not Found!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
