const {
  getNews,
  insertNews, 
  deleteNews,
   getArtists,
   getTeachers,
   getProducts,
   getUsersID,
   postMessage,
   getMessages,
} = require("../logic/public");

const { logger } = require("../common/log");

module.exports = function (app, connection) {

  app.get("/api/ozzo/news", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/v1/news [GET]`);
      getNews(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/ozzo/usersID", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/users [get]`);
      getUsersID(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });


  app.post("/api/ozzo/news", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/v1/news [POST]`);
      insertNews(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

   app.delete("/api/ozzo/news", async (req, res) => {
    try {
      logger.info(`${req.ip} /v1/news [delete]`);
      deleteNews(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

 app.get("/api/ozzo/artists", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/artists [get]`);
      getArtists(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/ozzo/teachers", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/teachers [get]`);
      getTeachers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/ozzo/products", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/products [get]`);
      getProducts(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/ozzo/message", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/message [post]`);
      postMessage(req, res, connection);
    }
    catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  })
  app.get("/api/ozzo/messages", async (req, res) => {
    try {
      logger.info(`${req.ip} /ozzo/messages [get]`);
      getMessages(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
