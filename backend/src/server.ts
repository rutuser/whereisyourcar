import * as express from 'express';
import * as morgan from 'morgan';
import * as session from 'express-session';
import * as compression from 'compression';
import { connect } from 'mongoose';
import * as cors from 'cors';
import * as passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import { User } from './api/user/model';
import * as ENV from '../config/env';

import * as userRouter from './api/user/index';
import * as vehicleRouter from './api/vehicle/index';
import * as recordRouter from './api/record/index';

const app = express();

passport.use(new Strategy((token, cb) => {
  User.findOne({ token }).then(user => {
    cb(undefined, user);
  }).catch(err => cb(err));
}));

// Morgan
app.use(morgan('combined'));

// Compression
app.use(compression());

// Express Session
app.use(session({ secret: 'SECRET!' }));
app.get('/', (req, res, next) => {
  if (req.session.views) {
    req.session.views++;
    res.send('Has visitado la página ' + req.session.views + ' veces.');
  } else {
    req.session.views = 1;
    res.send('Welcome');
  }
});

app.get('/tl', passport.authenticate('bearer', { session: false }),
  (req, res) => {
    res.json({ user: req });
  });

app.use(cors());
app.use(express.json());
connect(ENV.DB);
app.use('/user', userRouter);
app.use('/vehicle', vehicleRouter);
app.use('/record', recordRouter);

app.listen(3000);
