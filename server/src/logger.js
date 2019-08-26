'use strict';
const winston = require('winston');
const root = require('app-root-path');

const { combine, timestamp, label, json } = winston.format;

const formatOpts = combine(label({ label: 'app' }), timestamp(), json());

const log = winston.createLogger({
  levels: winston.config.syslog.levels,
  colorize: true,
  transports: [
    new winston.transports.Console({
      level: process.env.VAULT_LOG_LEVEL || 'info',
      format: formatOpts,
    }),
    new winston.transports.File({
      filename: `${root}/logs/vault.log`,
      level: process.env.VAULT_LOG_LEVEL || 'info',
      format: formatOpts,
    }),
  ],
});

log.stream = {
  write: (message) => log.info(message),
};

module.exports = log;