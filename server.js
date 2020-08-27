const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const connectDb = require('./config/db');
const passport = require('passport');

require('./config/passport')(passport);

//Connect db
connectDb();

const app = express();

app.use(express.json({ extended: false }));

//Initialize passport - allows for use of oauth
app.use(passport.initialize());

app.use('/auth', require('./api/routes/auth'));

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
