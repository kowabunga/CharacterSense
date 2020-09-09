const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const hashItem = async itemToHash => {
  const salt = await bcrypt.genSalt();
  const hashedItem = await bcrypt.hash(itemToHash, salt);
  return hashedItem;
};

exports.registerUser = async (req, res) => {
  try {
    //Check express-validator middleware for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Register items from request body
    const { firstName, lastName, email, password } = req.body;

    //Check if user already exists
    let user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ error: 'Cannot create user with these credentials' });
    }

    //Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    //Get hashed password and replace plaintext password in user object
    const hashPass = await hashItem(password);
    user.password = hashPass;

    await user.save();

    //Create jwt and send back with response -- for authentication
    const payload = {
      userId: user.id,
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '7d' },
      (error, token) => {
        if (error) throw error;
        res.cookie('charsensejwt', token).json({ msg: 'JWT Set' });
        // res.status(201).json({ token: token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    //Compare password from login to hashed password in user record in db
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    //Create jwt and send back with response -- for authentication
    const payload = {
      userId: user.id,
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '7d' },
      (error, token) => {
        if (error) throw error;
        res.cookie('charsensejwt', token).json({ msg: 'JWT Set' });
        // res.status(201).json({ token: token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.editPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const passHash = await hashItem(req.body.password);

    await User.findByIdAndUpdate(req.userId, { password: passHash });
    res.status(200).json({ msg: 'Password updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
