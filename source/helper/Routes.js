"use strict";
const Server = require(appRoot + "/source/Controller/server.js");

class Routes {
  constructor() {
    this.express = require("express");
    this.cors = require("cors");
    this.app = this.express();
    this.app.use(this.cors());
    this.app.use(this.express.json());

    this.router = this.express.Router();
  }
  setRoutes() {
    console.log("setting the routes");
    const authController = require(appRoot +
      "/source/Controller/authentication.js");
    this.app.use("/auth", function(req, res, next) {
      console.log("authetication started");
    });
    //return true;
  }
}
module.exports = Routes;
