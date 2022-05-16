require("dotenv").config();
let jwt = require("jsonwebtoken");
const { logger } = require("./log");

const calcToken = (decoded) => {
  let token = jwt.sign({ id: decoded }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_MINUTE + "m",
  });
  return token;
};

const checkAuthentication = async (req) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new Error("Unautorization!");
  }
  try {
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    token = await calcToken(decoded.id);
    return token;
  } catch (error) {
    throw new Error("TOKEN_EXPIRED");
  }
};

const isAuth = async (req, res, next) => {
  try {
    req.Token = await checkAuthentication(req);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
    logger.error(`${req.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  calcToken,
  checkAuthentication,
  isAuth,
};