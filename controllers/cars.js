
const repository = require('../repository');

const get = async (req, res, next) => {
  const cars = await repository.getCars();
  res.json(cars).status(200);
}

const getOne = async (request, response, next) => {
  const carId = request.params.id;
  const car = await repository.getCar(carId);
  if(car){
    response.json(car).status(200);
  } else {
    response.json({message: "Not found"});
    response.status(404);
      response.send();
  }
}

const post = async (request, response, next) => {
  const carPayload = request.body;
  console.log(`Received payload: ${JSON.stringify(carPayload)}`);
  const car = await repository.createCar(carPayload);
  const responsePayload = {
    id: car.insertedId,
    brand: carPayload.brand,
    model: carPayload.model,
    year: carPayload.year,
    color: carPayload.color
  };
  response.json(responsePayload).status(201);
}

const remove = async (request, response, next) => {
  const carId = request.params.id;
  console.log(`Got a delete request for car with id: ${carId}`);
  await repository.deleteCar(carId);
  response.json({message: "Ok"}).status(204);
}

module.exports = {get, post, remove, getOne};