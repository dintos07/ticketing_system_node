jws = require("jsonwebtoken");
dotenv = require("dotenv").config();

class authtoken {
  create_token(payload) {
    let userToken = jws.sign(payload, process.env.DOMJWT_TOCKEN, {
      expiresIn: "15 minutes"
    });
    return userToken;
  }

  validate_token(token) {
    return jws.verify(token);
  }
}
module.exports = authtoken;
