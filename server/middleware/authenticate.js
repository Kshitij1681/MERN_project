const jwt = require("jsonwebtoken");
const mernUser = require("../model/schema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided!" });
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (verifyToken) {
      const rootUser = await mernUser.findOne({ _id: verifyToken._id, "tokens.token": token });
      if (!rootUser) res.status(401).json({ error: "User Not Found!" });
      else {
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
      }
    } else {
      res.status(401).json({ error: "Invalid Token!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authenticate;
