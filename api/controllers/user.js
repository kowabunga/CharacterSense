const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const hashItem = async ptPassword => {
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

    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ type: 'EMAIL_IN_USE', msg: 'Email already in use' });
    }

    user = new User({
      name,
      email,
      password: await hashItem(password),
    });

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, process.env.SECRET, (err, token) => {
      if (err) throw new Error(err);

      res
        .status(201)
        .json({ type: 'USER_CREATED', msg: 'User created', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        type: 'INVALID_CREDENTIALS',
        msg: 'No registered user with that email',
      });
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return res.status(401).json({
        type: 'INVALID_CREDENTIALS',
        msg: 'Username or password incorrect',
      });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: Date.now() + '7d',
      },
      (err, token) => {
        if (err) throw new Error(err);

        res
          .status(201)
          .json({ type: 'LOGIN_SUCCESS', msg: 'Logged in', token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.editPassword = async (req, res) => {
  try {
    const { password } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      password: await hashItem(password),
    });

    res
      .status(200)
      .json({ type: 'PASSWORD_UPDATE_SUCCESS', msg: 'Password updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'No user by this id' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.addToken = async (req, res) => {
  try {
    console.log(req.body.mahdfsj);
    const { oauthtoken } = req.body;

    if (oauthtoken) {
      const hashToken = await hashItem(oauthtoken);
      let user = await User.findByIdAndUpdate(
        req.user.id,
        {
          authorizationToken: hashToken,
          isAuthorized: hashToken !== null,
        },
        { new: true } //want to return updated user
      );

      res.status(200).json({ type: 'AUTHORIZE_SUCCESS', user: user });
    } else {
      res.redirect('http://localhost:3000/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
