import { Record, Point } from './model';
import { oneHourAgo } from '../../utils/Utils';

export const getRecordUser = (userID) => {
  return Record.find({ id_user: { $in: [`${userID._id}`] } });
};

export const getRecordVehicle = (vehicleID) => {
  return Record.find({ id_vehicle: { $in: [`${vehicleID._id}`] } });
};

export const getRecords = () => {
  return Record.find();
};

export const getNear = (point: Point) => {
  const query = {
    location: {
      $near: {
        $geometry: {
           type: 'Point' ,
           coordinates: [ point.latitude, point.longitude ]
        },
        $maxDistance: 600
      }
    },
    created: { $gte: oneHourAgo() } // Busca en el campo "created" el valor que sea mayor que lo que devuelve oneHourAgo
  };
  return Record.find(query);
};

export const newRecord = (record) => {
  console.log(record);
  const recordToCreate = new Record({
    id_vehicle: record.id,
    id_user: record.id_user,
    location: [
      record.lat,
      record.lng
  ]
  });
  console.log(recordToCreate);
  return recordToCreate.save();
};
