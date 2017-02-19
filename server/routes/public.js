/**
 * Created by PSWIDERSKI on 19.02.2017.
 */
const express = require("express");
const publicRoutes = express.Router();

publicRoutes.get("", function (request, response) {
    response.json({
        title: "Simple Chatting App",
        text: "Welcome in api!!!"
    });
});
exports.publicRoutes = publicRoutes;
