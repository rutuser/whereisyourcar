import { Vehicle } from './model';
import { Promise } from 'mongoose';

/*
export const getVehicle = (vehicleID) => {
  return Vehicle.find({ id_vehicle: { $in: [`${vehicleID}`] } });
};*/
// Devuelve el _id del usuario habiendo buscado por nombre
export const getVehicleID = (req) => {
  return new Promise((resolve, reject) => {
    Vehicle.find({ id_user: { $in: [`${req.session.userID._id}`] } }).then(vehicles => {
      req.session.vehicleID = { _id: vehicles[0]._id };
      resolve(req.session.vehicleID);
    }).catch(err => reject(err));
  });
};

export const getVehicles = (userID: string) => {
  return Vehicle.find({ id_user: userID });
};

export const newVehicle = (vehicle, userID) => {
  const vehicleToCreate = new Vehicle({ ...vehicle });
  vehicleToCreate.id_user = userID;
  return vehicleToCreate.save();
};

export const updateVehicle = (vehicle, vehicleID) => {
  return Vehicle.findOneAndUpdate({ _id: { $in: [`${vehicleID._id}`] } }, { $set: vehicle }, { new: true });
};

export const deleteVehicle = (vehicleID) => {
  return Vehicle.findOneAndRemove({ _id: { $in: [`${vehicleID._id}`] } });
};
