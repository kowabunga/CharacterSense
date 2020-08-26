const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const connectDb = require('./config/db');

//Connect db
connectDb();

const app = express();

app.use(express.json({ extended: false }));

app.use('/auth', require('./api/routes/auth'));

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
