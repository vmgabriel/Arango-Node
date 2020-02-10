"use strict";

// Interfaces
import { IUser } from '../interfaces/user';

// Models
import userModel from '../models/user';

/** Class of User Service based in connection with User */
export class UserService {

  /**
   * Create a User in DataBase
   * @param user User to Saved In Database
   * @return {Promise<Partial<IUser>>} Data of User in Database
   */
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
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Find User By Id
   * @param id {string} Id of User
   * @return {Promise<IUser>} Data of User
   */
  public findById(id: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userModel.find().where({ _key: id });
        if (user) {
          resolve(user);
        } else {
          reject(new Error("User not found"));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Update Data of User
   * @param id {string} Id Of User
   * @param user {Partial<IUser>} Data of User to Updated
   */
  public update(id: string, user: Partial<IUser>): Promise<Partial<IUser>> {
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

  /**
   * Delete User By Id
   * @param id {string}
   * @return {Promise<Partial<IUser>>} User Deleted
   */
  public delete(id: string): Promise<Partial<IUser>> {
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
