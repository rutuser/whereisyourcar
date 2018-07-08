import * as express from 'express';
import { getRecordUser, getRecordVehicle, getRecords, newRecord , getNear } from './controller';
import { Point } from './model';

const router = express.Router();

// Muestra una localización identificada por id_record
router.get('/user', (req, res) => {
  getRecordUser(req.session.userID).then((record) => res.json(record)).catch((err) => res.status(500).send(err));
});

// Muestra una localización identificada por id_vehicle
router.get('/vehicle', (req, res) => {
  getRecordVehicle(req.params.recordID).then((record) => res.json(record)).catch((err) => res.status(500).send(err));
});

// Muestra todas las localizaciones
router.get('/', (req, res) => {
  getRecords().then((record) => res.json(record)).catch((err) => res.status(500).send(err));
});

// Busca las localizaciones cercanas pasando latitud y longitud en el json del body
router.post('/near', (req: any, res) => {
  const point: Point = { latitude: req.body.latitude, longitude: req.body.longitude };
  getNear(point).then((record) => res.json(record)).catch((err) => res.status(500).send(err));
});

// Añade una localización nueva pasando la información en el json del body
router.post('/add', (req, res) => {
  newRecord(req.body).then((result) => res.json(result)).catch((err) => res.status(400).send(err));
});

export = router;
