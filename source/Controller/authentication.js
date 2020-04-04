"use strict";
const Server = require(appRoot + "/source/Controller/server.js");
const authtoken = require(appRoot + "/source/helper/JwtToken.js");
const database_object = require(appRoot + "/source/Model/databasemodel.js");
class authetication extends Server {
  constructor() {
    super();
    super.initialisation();
    this.router = this.express.Router();
  }
  login_validation(req, res, next) {
    var response = {};
    if (req.body.username === undefined || req.body.password === undefined) {
      response["error_flag"] = "1";
      response["message"] = "Something went wrong .Please contact admin";
    } else if (req.body.username == "" && req.body.password == "") {
      response["error_flag"] = "1";
      response["message"] = "Please fille the required fields";
    } else if (req.body.username == "") {
      response["error_flag"] = "1";
      response["message"] = "User Name is Required";
    } else if (req.body.password == "") {
      response["error_flag"] = "1";
      response["message"] = "password is Required";
    } else {
      response["error_flag"] = "0";
    }
    if (response.error_flag != "1") {
      next();
    } else {
      res.send(response);
      res.end();
    }
  }
  async login_check(req, res) {
    var response = {};
    var userdatas = {};
    try {
      var where = Array();
      where.push(req.body.username);
      where.push(req.body.password);
      var current_sql =
        "select id,name,status from user_credentials where user_name=? and password=?";
      var user_details = await database_object
        .db_datacheck(current_sql, where)
        .then(resuldata => {
          return resuldata;
        });

      if (user_details !== undefined) {
        if (user_details.status == "1") {
          const userCredentials = {
            id: user_details.id,
            name: user_details.name
          };
          var authtokenobj = new authtoken();
          let token_data = authtokenobj.create_token(userCredentials);

          userdatas["token"] = token_data;
          response["information"] = userdatas;
          response["error_flag"] = "0";
        } else {
          response["error_flag"] = "1";
          response["message"] =
            "Sorry!. Your login is deactivated .Please contact admin";
        }
      } else {
        response["error_flag"] = "1";
        response["message"] = "User name or password is wrong";
      }
    } catch (error) {
      response["error_flag"] = "1";
      response["message"] = "Something went wrong.Please contact admin";
    }

    res.json(JSON.stringify(response));
  }
}

let authentication_object = new authetication();

authentication_object.router.use(
  "/",
  authentication_object.login_validation,
  function(req, res, next) {
    console.log("validation is executing");
    next();
  }
);

authentication_object.router.post(
  "/",
  authentication_object.login_check.bind(authentication_object),
  function(req, res, next) {
    console.log("login check is executed");
  }
);
module.exports = authentication_object.router;
