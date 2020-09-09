const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const connectDb = require('./config/db');
const passport = require('passport');
const cors = require('cors');
const bnetPassport = require('./config/passport');
// const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

//Initialize bnet passport strategy
bnetPassport(passport);

//Connect db
connectDb();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json({ extended: false }));

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_SESSION_KEY],
//   })
// );

//Initialize passport - allows for use of oauth
app.use(passport.initialize());

//use passport session
app.use(passport.session());

app.use('/auth', require('./api/routes/auth'));
app.use('/users', require('./api/routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
