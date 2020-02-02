"use strict";

const orango = require('orango');

// Interfaces
import { IUser } from '../interfaces/user';

// Models
import userModel from '../models/user';

export class UserService {

  constructor() {
  }

  public create(user: Partial<IUser>): Promise<Partial<IUser>> {
    return new Promise(async (resolve, reject) => {
      try {
        const dModel = new userModel(user);
        await dModel.save({ returnNew: true});
        console.log("model Creado ->", dModel);
        if (!!dModel._key) {
          resolve(dModel);
        } else {
          reject(new Error("It Can't save object"));
        }
      } catch(err) {
        reject(err);
      }
    });
  }

  // End Class UserService
}
