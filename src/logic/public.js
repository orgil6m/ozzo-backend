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
const getArtists = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = {"artist" : true, "teacher" : false, 'director': false };
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
const getTeachers = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = { $and : [ { "teacher" : true}, {$or : [{'director': false}, { 'director': null}]}]}
    const projection = { _id: 0, "password": 0,  roles: 0, priority : 0 };
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
const getDirectors = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = { "director" : true,  };
    const projection = { _id: 0, "password": 0,  roles: 0, priority : 0 };
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
const getCrew = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const query = { "teacher" : false, "director" : false}
    const projection = { _id: 0, "password": 0,  roles: 0, priority : 0 };
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
};
