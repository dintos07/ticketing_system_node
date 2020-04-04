function Server() {
  this.express = require("express");
  this.cors = require("cors");
}
Server.prototype.initialisation = function initialisation() {
  this.app = this.express();
  this.app.use(this.cors());
  this.app.use(this.express.json());
};

Server.prototype.initializeServer = function initializeServer(port) {
  this.app.listen(port, () => {
    console.log("server start listening port " + port);
  });
};
module.exports = Server;
