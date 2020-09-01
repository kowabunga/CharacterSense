const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const connectDb = require('./config/db');
const passport = require('passport');
const cors = require('cors');

require('./config/passport')(passport);

//Connect db
connectDb();

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

//Initialize passport - allows for use of oauth
app.use(passport.initialize());

app.use('/auth', require('./api/routes/auth'));
app.use('/user', require('./api/routes/user'));

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
