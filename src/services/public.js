const {
  getNews,
  getArtists,
  getDirectors,
  getTeachers,
  getCrew,
  getProducts,
  postMessage,
} = require("../logic/public");

const { logger } = require("../common/log");

module.exports = function (app, connection) {
  app.get("/api/ozzo/getNews", async (req, res) => {
  try {
    logger.info(`${req.ip} /api/v1/news [GET]`);
    getNews(req, res, connection);
  } catch (err) {
    logger.error(`${req.ip} ${err}`);
    res.status(500).json({ error: err.message });
  }
  });
  app.get("/api/ozzo/getArtists", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/artists [get]`);
      getArtists(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/ozzo/getDirectors", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/directors [get]`);
      getDirectors(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  })
  app.get("/api/ozzo/getTeachers", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/teachers [get]`);
      getTeachers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/ozzo/getCrew", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/crew [get]`);
      getCrew(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/ozzo/getProducts", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/products [get]`);
      getProducts(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ozzo/postMessage", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/message [post]`);
      postMessage(req, res, connection);
    }
    catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  })
};
