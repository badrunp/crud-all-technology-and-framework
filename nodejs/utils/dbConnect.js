const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('config');

const url = config.get('mongo_url');

async function dbConnect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('Database connected');
  } catch (error) {
    logger.error(error);
  }
}

module.exports = dbConnect;
