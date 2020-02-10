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

  public find(id: String): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userModel.find().where({_key:id});
        if (user){
          resolve(user);
        } else {
          reject(new Error("User not found"));
        }
      } catch (err) {
        reject(err)
      }
    });
  }

  public findAllUsers(): Promise<Array<IUser>> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await userModel.find();
        if (result){
          resolve(result);
        } else {
          reject (new Error("Users not found"));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  public update(id: String, user: Partial<IUser>): Promise<Partial<IUser>> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await userModel.update(user).where({_key: id, isValid: true}).return();
        if (result) {
          resolve(result);
        } else {
          reject(new Error("User could not be update"));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  public delete(id: String): Promise<Partial<IUser>> {
    return new Promise( async (resolve, reject) => {
        try {
          let result = await userModel.update({isValid: false}).where({_key: id}).return();
          if (result) {
            resolve(result);
          } else {
            reject(new Error("User could not be delete"));
          }
        } catch (err) {
          reject(err);
        }
    });
  }
  // End Class UserService
}
