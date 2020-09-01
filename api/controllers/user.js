const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

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
      password,
    });

    const salt = await bcrypt.genSalt(); //defaults to 10 rounds
    const passHash = await bcrypt.hash(password, salt);
    user.password = passHash;

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
