const { MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'training';

const createDB = async() => {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const getCars = async() => {
  const db = await createDB();
  const carCollections = db.collection('cars');
  const cars = await carCollections.find({}).limit(10).toArray();
  return cars;
}

const createCar = async (carPayload) => {
  const db = await createDB();
  const carCollections = db.collection('cars');
  const car = await carCollections.insertOne(carPayload);
  return car;
}

const getCar = async(carId) => {
  const db = await createDB();
  const carCollections = db.collection('cars');
  try {
    const car = await carCollections.findOne({_id: new ObjectId(carId)});
    return car;
  } catch (e) {
    console.error(e);
    return;
  }
}

const deleteCar = async(carId) => {
  const db = await createDB();
  const carCollections = db.collection('cars');
  const deleteOp = await carCollections.deleteOne({_id: new ObjectId(carId)});
  console.log(deleteOp);
}

const updateCar = async(carId, carPayload) => {

}

module.exports = {createCar, getCar, getCars, deleteCar, updateCar};