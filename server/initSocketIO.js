/**
 * Created by PSWIDERSKI on 19.02.2017.
 */
const socketIO = require("socket.io");

function initSocketIO(server) {
    logger.info("Initializing socketIO");

    const io = socketIO.listen(server);

    io.on("connection", function (socket) {
        logger.info("a user connected");
        socket.on("disconnect", function () {
            logger.info("user disconnected");
        });

        socket.on("echo", function (msg, callback) {
            callback = callback || function () {
                };

            socket.emit("echo", msg);

            callback(null, "Done.");
        });
    });
}

module.exports = initSocketIO;