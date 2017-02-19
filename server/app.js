/**
 * Created by PSWIDERSKI on 19.02.2017.
 */
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const publicRoutes = require("./routes/public");
const config = require("./config/server.config.json");
const initSocketIO = require("./initSocketIO");
const initLogger = require("./initLogger");
initLogger();
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", publicRoutes.publicRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

server.listen(normalizePort(process.env.PORT || config.serverPort));
server.on("error", onError);
server.on("listening", onListening);
initSocketIO(server);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const normalizedPort = parseInt(val, 10);
    if (isNaN(normalizedPort)) {
        // named pipe
        return val;
    }
    if (normalizedPort >= 0) {
        // port number
        return normalizedPort;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    logger.info("Listening on " + bind + "\n");
}

module.exports = server; // for testing