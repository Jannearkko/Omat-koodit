require('express-async-errors');
const express = require('express');
const app = express();
/*onst PORT = 3000;*/
const albums = require('./routes/routes.js');
require('./database/db.js');
require('dotenv').config();
const { applyMiddleware, errorHandler } = require('./middleware/middleware.js');
const connectMongoDB = require('./database/db.js');

applyMiddleware(app); // call the middleware function to apply all middleware

app.use('/api', albums);

app.all('*', (req, res) => {
  res.status(404).send('<h1>Not found!</h1>');
});
/* eslint-disable no-undef */
app.use(errorHandler); // this errorHandler is utilizing the custom CustomError -class

const start = async () => {
  try {
    await connectMongoDB(process.env.CONN_TEST_STRING);
    console.log('MongoDB connection established');
    /*app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));*/
  } catch (error) {
    console.log(error);
  }
};
start();
/* eslint-enable no-undef */

module.exports = app;




