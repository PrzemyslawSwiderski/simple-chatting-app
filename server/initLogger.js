/**
 * Created by PSWIDERSKI on 19.02.2017.
 */
const winston = require("winston");
const config = require("./config/server.config.json");

const logFormatter = function (options) {
    // Return string will be passed to logger.
    return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
};

const getTimestamp = function () {
    return new Date().toLocaleString();
};

const getTimestampJSON = function () {
    return new Date();
};

function initLogger() {
    logger = new (winston.Logger)({
        transports: [
            new winston.transports.Console({
                timestamp: getTimestamp,
                formatter: logFormatter
            }),
            new winston.transports.File({
                filename: config.logsFileName,
                timestamp: getTimestampJSON
            })
        ],
        exceptionHandlers: [
            new winston.transports.File({filename: config.exceptionsLogFileName})
        ]
    });
    logger.level = process.env.LOG_LEVEL || config.defaultLogLevel;
    logger.info("Logger level is: " + logger.level);
}
module.exports = initLogger;