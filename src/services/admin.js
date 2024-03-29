const {
  login,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  deleteMessage,
  insertNews,
  deleteNews,
  getMessages,
  getUsers,
  insertCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getPositions,
  getRequests,
  getFeedBacks,
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
  app.post("/api/ozzo/getUsers", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/getUser [get]`);
      getUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/getUser", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/getUser [get]`);
      getUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/insertUser", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [post]`);
      insertUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.put("/api/ozzo/updateUser", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [put]`);
      updateUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/ozzo/updateUser", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [DELETE]`);
      deleteUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/ozzo/deleteUser", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [delete]`);
      deleteUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/ozzo/deleteMessage", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/message [delete]`);
      deleteMessage(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/insertNews", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /api/v1/news [POST]`);
      insertNews(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/ozzo/deleteNews", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /v1/news [delete]`);
      deleteNews(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/getMessages", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/messages [get]`);
      getMessages(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/insertCourse", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/courses [post]`);
      insertCourse(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/getCourses", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/messages [get]`);
      getCourses(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/deleteCourse", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/courses [delete]`);
      deleteCourse(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.put("/api/ozzo/updateCourse", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/course [put]`);
      updateCourse(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/getPositions", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/positions [get]`);
      getPositions(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/positions/getRequests", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/positions/getRequests [get]`);
      getRequests(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/ozzo/feedbacks/getFeedBacks", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/feedbacks/getFeedBacks [POST]`);
      getFeedBacks(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
