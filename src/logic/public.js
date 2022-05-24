const { logger } = require("../common/log");

var mongodb = require("mongodb");




const getNews = async (request, response, pool) => {
  try {
    const collection = pool.collection("news");
    const rows = await collection.find({}).toArray();
    return response.status(200).json({
      data: rows
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const insertNews = async (request, response, pool) => {
  try {
    const collection = pool.collection("news");
    await collection.insertOne(request.body);
    return response.status(200).json({ message: "success" });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const deleteNews = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("news");
    const deleteResult = await collection.deleteOne({
      _id: new mongodb.ObjectID(_id),
    });
    logger.info(`Deleted documents id:${_id} => ${deleteResult.deletedCount}`);
    return response.status(200).json({ message: "success" });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const getArtists = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = {"artist" : true};
    const projection = { _id: 0, "password": 0, "username" : 0, roles: 0,priority : 0 };
    const rows = await collection.find(query).project(projection).sort({priority:1}).toArray();
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const getUsersID = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const projection = { _id: 1};
    const rows = await collection.find({}).project(projection).sort({priority:1}).toArray();
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
    const query = { $or : [ {"teacher" : true}, { "admin" : true }]};
    const projection = { _id: 0, "password": 0, "username" : 0, roles: 0, priority : 0 };
    const rows = await collection.find(query).project(projection).sort({priority:1}).toArray();
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
    return response.status(200).json({ message: "Хүсэлт Амжилттай" });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return; 
  }
};

const getMessages = async (request, response, pool) => {
  try {
    const collection = pool.collection("messages");
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

module.exports = {
 getNews,
 insertNews,
 deleteNews,
 getArtists,
 getUsersID,
 getTeachers,
 getProducts,
 postMessage,
 getMessages
};
