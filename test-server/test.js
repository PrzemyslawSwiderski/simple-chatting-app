/**
    * Created by PSWIDERSKI on 19.02.2017.
    */
process.env.NODE_ENV = "test";

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const io = require("socket.io-client");
const tstConfig = require("./config/tests.config.json");
const should = chai.should();


chai.use(chaiHttp);

describe("Test Chat Server", function () {
    var server,options ={
            transports: ['websocket'],
            'force new connection': true
        };

    beforeEach(function (done) {
        // start the server
        server = require("../server/app");

        done();
    });

    describe("Test API", function () {

        it("it should return correct API response", function (done) {
                chai.request(server)
                    .get("/api")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.title.should.be.eql("Simple Chatting App");
                        res.body.text.should.be.ok;
                        done();
                    });
            }
        );
    });

    describe("Test SocketIO", function () {

        it("it should emit message", function (done) {
            var client = io.connect(tstConfig.serverURL, options);

            client.once("connect", function () {
                client.once("echo", function (message) {
                    message.should.equal("Hello World");

                    client.disconnect();
                    done();
                });

                client.emit("echo", "Hello World");
            });

            }
        );
    });
});
