require('dotenv').config();
/* eslint-disable no-undef */
const PORT = process.env.TEST_PORT;
const mongoUri = process.env.CONN_TEST_STRING;

module.exports = {
  mongoUri,
  PORT
};