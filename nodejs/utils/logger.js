const dayjs = require('dayjs');
const pino = require('pino');
const config = require('config');

const level = config.get('level');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  base: {
    pid: false,
  },
  level,
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

module.exports = logger;
