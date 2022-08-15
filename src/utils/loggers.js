const winston = require('winston');

const logConfig = {
    level: 'info',
    transports: [new winston.transports.Console({level: 'info'}),
                new winston.transports.File({
                    filename: './logs/warnings.log',
                    level: 'warn'
                }),
                new winston.transports.File({
                    filename: './logs/errors.log',
                    leve: 'error',
                }),
    ]
}
const logger = winston.createLogger(logConfig)
module.exports = logger