const { logger } = require("../common/log");
var moment = require("moment");
var mongodb = require("mongodb");

const getNews = async (request, response, pool) => {
  try {
    const collection = pool.collection("news");
    const rows = await collection.find({}).toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const getArtists = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = { artist: true, active: true };
    const projection = {
      _id: 0,
      password: 0,
      username: 0,
      roles: 0,
      priority: 0,
    };
    const rows = await collection
      .find(query)
      .project(projection)
      .sort({ priority: 1 })
      .toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const getTeachers = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = {
      $and: [
        { teacher: true, active: true },
        { $or: [{ director: false }, { director: null }] },
      ],
    };
    const projection = { _id: 0, password: 0, roles: 0, priority: 0 };
    const rows = await collection
      .find(query)
      .project(projection)
      .sort({ priority: 1 })
      .toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const getDirectors = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = { active: true, director: true };
    const projection = { _id: 0, password: 0, roles: 0, priority: 0 };
    const rows = await collection
      .find(query)
      .project(projection)
      .sort({ priority: 1 })
      .toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const getCrew = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = {
      $and: [
        { active: true },
        {
          $or: [
            { teacher: false, director: false },
            { teacher: null, director: null },
          ],
        },
      ],
    };
    const projection = { _id: 0, password: 0, roles: 0, priority: 0 };
    const rows = await collection
      .find(query)
      .project(projection)
      .sort({ priority: 1 })
      .toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const getProducts = async (request, response, pool) => {
  try {
    const collection = pool.collection("products");
    const rows = await collection.find({}).toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const postMessage = async (request, response, pool) => {
  try {
    const collection = pool.collection("messages");
    await collection.insertOne(request.body);
    return response.status(200).json({ message: "success" });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const getCourses = async (request, response, pool) => {
  try {
    const collection = pool.collection("courses");
    const query = {};
    const projection = { _id: 0, updatedBy: 0, updatedDate: 0 };
    const rows = await collection
      .find(query)
      .project(projection)
      .sort()
      .toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const getOpenPositions = async (request, response, pool) => {
  try {
    const collection = pool.collection("positions");
    const query = { open: true };
    const projection = {};
    const rows = await collection
      .find(query)
      .project(projection)
      .sort()
      .toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const sendFeedBack = async (request, response, pool) => {
  try {
    const collection = pool.collection("feedback");
    request.body.createdDate = moment().format("HH:mm:ss YYYY-MM-DD");
    await collection.insertOne(request.body);
    return response.status(200).json({ message: "success" });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  getNews,
  getArtists,
  getDirectors,
  getTeachers,
  getCrew,
  getProducts,
  postMessage,
  getCourses,
  getOpenPositions,
  sendFeedBack,
};
