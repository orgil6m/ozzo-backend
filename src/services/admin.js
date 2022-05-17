
const {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  getUser,
  login,
} = require("../logic/admin");

const { logger } = require("../common/log");
const { isAuth } = require("../common/auth");

module.exports = function (app, connection) {

  app.post("/api/ozzo/login", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/ozzo/login [POST]`);
      login(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  // endpoints
  app.get("/api/ozzo/users", isAuth,  async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [get]`);
      getUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/ozzo/getUser", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/getUser [get]`);
      console.log(req.body)
      getUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/ozzo/users", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [post]`);
      insertUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/ozzo/users", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [put]`);
      updateUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/ozzo/users", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [delete]`);
      deleteUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

};
