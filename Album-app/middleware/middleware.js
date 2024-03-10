const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/userSchema');
require('dotenv').config();

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) { // handle all errors instanciated with the CustomError -class
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else { // handle all errors that fall outside of the scope of CustomError class, if any.
    console.error('Error: ', err);
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

/* eslint-disable no-undef */
async function authenticationToken(req, res, next) { // authToken middleware
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = req.body._id;

  if (token == null) return res.sendStatus(401);

  // logic to issue new accessToken if refreshToken exists in user database
  const user = await User.findOne({ _id: userId });
  if (user && user.refreshToken) {
    jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        throw new CustomError(403, 'No refresh token');
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.user = { _id: user._id, token };
        next();
      }
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
}

function applyMiddleware(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('./public'));
  app.use(express.json());
  app.use(cors());

  // session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.CONN_STRING, autoRemove: 'interval', autoRemoveInterval: 60 }), // autoRemove expires session entries every 60 minutes
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      httpOnly: true
    }
  }
  ));
}

module.exports = {
  authenticationToken,
  applyMiddleware,
  errorHandler,
};