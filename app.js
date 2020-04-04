var path = require("path");
global.appRoot = path.resolve(__dirname);
const Server = require(appRoot + "/source/Controller/server.js");

class app extends Server {
  constructor() {
    super();
    super.initialisation();
    super.initializeServer(4041);
    this.router = this.express.Router();
  }
  geturl(req, res, next) {
    let current_url = req.url.split("/");
    this.routing(current_url[1]);
    next();
  }
  routing(Controller) {
    const authController = require(appRoot +
      "/source/Controller/" +
      Controller +
      ".js");
    this.app.use("/" + Controller, authController);
  }
}
let server_obj = new app();
server_obj.app.use(server_obj.geturl.bind(server_obj));
