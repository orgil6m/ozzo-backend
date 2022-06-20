const { logger } = require("../common/log");
const moment = require("moment");
var mongodb = require("mongodb");
const { calcToken } = require("../common/auth");

const login = async (request, response, pool) => {
  try {
    const { username, password } = request.body;
    const collection = pool.collection("users");
    const rows = await collection.find({ username, password }).toArray();
    if (rows && rows.length > 0) {
      return response.status(200).json({
        message: "Амжилттай нэвтэрлээ",
        user: rows[0],
        token: calcToken(rows[0].username),
        loggedTime : moment()  .format("YYYY-MM-DD HH:mm"),
        tokenExpTime: moment()
          .add(process.env.TOKEN_EXPIRE_MINUTE, "m")
          .format("YYYY-MM-DD HH:mm"),
      });
    } else {
      return response.status(401).json({
        message: "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!",
      });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const getUser = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log('my id ==>', id)
    const collection = pool.collection("users");
    const query = { "_id" : new mongodb.ObjectID(id)  }
    const rows = await collection.findOne(query);
    console.log(rows)
    return response.status(200).json({
      data: rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const insertUser = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    await collection.insertOne(request.body);
    return response.status(200).json({ message: "success" });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return; 
  }
};
const deleteUser = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("users");
    const deleteResult = await collection.deleteOne({
      _id: new mongodb.ObjectID(_id),
    });
    logger.info(`Deleted documents id:${_id} => ${deleteResult.deletedCount}`);
    return response.status(200).json({ message: "success`" });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const updateUser = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("users");
    delete request.body._id;
     await collection.updateOne(
        { _id: new mongodb.ObjectID(_id) },
        { $set: request.body }
    );
    const user = await collection.findOne({
      _id: new mongodb.ObjectID(_id),
    });
    return response.status(200).json({ message: "success" , user});
    console.log(user)
   
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const deleteMessage = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("messages");
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
const getUsers = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const rows = await collection.find({}).sort({priority:1}).toArray();
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
};
