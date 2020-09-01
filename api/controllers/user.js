const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const router = require('../routes/user');

const hashPassword = async ptPassword => {
  const salt = await bcrypt.genSalt();
  const passHash = await bcrypt.hash(ptPassword, salt);
  return passHash;
};

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, confirmPassword } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    user = new User({
      name,
      email,
      password: await hashPassword(password),
    });

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, process.env.SECRET, (err, token) => {
      if (err) throw new Error(err);

      res.status(201).json({ msg: 'User created', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.editPassword = async (req, res) => {
  console.log(req.user);
  try {
    const { password } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      password: await hashPassword(password),
    });

    res.status(200).json({ msg: 'Password updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  try {
       
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
