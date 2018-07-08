import { User, UserModel } from './model';
import { Promise } from 'mongoose';
import { v1 as uuid } from 'uuid';

// Devuelve todo el usuario buscando por nombre
export const getUser = (userName) => {
  return User.find({ name: { $in: [`${userName}`] } });
};

// Devuelve el _id del usuario habiendo buscado por nombre
export const getUserID = (userName, req) => {
  return new Promise((resolve, reject) => {
    User.find({ name: { $in: [`${userName}`] } })
    .then(users => {
      req.session.userID = { _id: users[0]._id };
      resolve(req.session.userID);
    }).catch(err => reject(err));
  });
};

// Comprueba el inicio de sesión si existe el usuario y contraseña
export const login = (name: string , password: string): Promise<UserModel> => {
  return new Promise((resolve, reject) => {
    User.findOne({ name, password })
    .then(user => {
      const newAuthToken = uuid();
      User.update({ _id: user._id }, { token: newAuthToken }).then(() => {
        const result = user;
        result.token = newAuthToken;
        resolve(result);
      }).catch(err => {
        console.error('Error guardando el nuevo token', err);
        reject('Ups! algo ha fallado');
      });
    }).catch(err => reject(err));
  });
};

// Obtiene todos los usuarios
export const getUsers = () => {
  return User.find();
};

// Crea un nuevo usuario
export const newUser = (user, userID) => {
  const userToCreate = new User({ ...user });
  userID = userToCreate._id;
  return userToCreate.save();
};

// Actualiza un usuario cogiendo el _id del request
export const updateUser = (user, userID) => {
  return User.findOneAndUpdate({ _id: { $in: [`${userID._id}`] } }, { $set: user }, { new: true });
};

// Elimina el usuario cogiendo el _id del request
export const deleteUser = (userID) => {
  return User.findOneAndRemove({ _id: { $in: [`${userID._id}`] } });
};
