import * as express from 'express';
import { getVehicleID, getVehicles, newVehicle, updateVehicle, deleteVehicle } from './controller';
import * as passport from 'passport';

const router = express.Router();

// Muestra un vehiculo identificado por id_vehicle
/*
router.get('/:vehicleID', (req, res) => {
  getVehicle(req.params.vehicleID).then((vehicle) => res.json(vehicle)).catch((err) => res.status(500).send(err));
});*/
// Muestra un el ID de un vehiculo buscando por el id del usuario
router.get('/id', (req, res) => {
  getVehicleID(req).then(vehicleID => res.send(vehicleID)).catch((err) => res.status(500).send(err));
});

// Muestra todos los vehiculos
router.get('/all', passport.authenticate('bearer', { session: false }), (req: any , res) => {
  const userID = req.user._id;
  getVehicles(userID).then((vehicle) => res.json(vehicle)).catch((err) => res.status(500).send(err));
});

// Añade un vehiculo nuevo al id del usuario
router.post('/add', passport.authenticate('bearer', { session: false }), (req: any , res) => {
  const userID = req.user._id;
  newVehicle(req.body, userID).then((result) => res.json(result)).catch((err) => res.status(400).send(err));
});

// Actualiza la información de un vehiculo
// FIXME hacer funcionar
router.put('/update', passport.authenticate('bearer', { session: false }), (req: any, res) => {
  const userID = req.user._id;
  updateVehicle(req.body, userID).then((vehicle) => res.json(vehicle)).catch((err) => res.status(400).send(err));
});

// Elimina un vehiculo concreto pasando el ID
// FIXME crear el delete
router.delete('/delete', (req, res) => {
  deleteVehicle(req.session.vehicleID).then(() => res.send()).catch((err) => res.status(400).send(err));
});

export = router;
