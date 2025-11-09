import winston from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = path.join(__dirname, '../../logs');

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), myFormat),
    }),
    new winston.transports.File({ filename: path.join(logDir, 'app.log') }),
  ],
});

export default logger;
