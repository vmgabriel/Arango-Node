"use strict";

// Interfaces
import { IUser } from '../interfaces/user';

// Constants
import config from "../config";

// Libraries
const orango = require('orango');
const db = orango.get(config.dbName);
const Joi = require('joi');

let schema = new orango.Schema({
  name: { type: String, min: 3, max: 50 } ,
  lastName: { type: String, min: 3, max: 100 },
  email: { type: String, email: { minDomainAtoms: 2 } },
  cellPhone: { type: String, min: 3, max: 50 },
  alias: { type: String, min: 2, max: 100 },
  dateBorn: Date,
  country: { type:String, min: 2, max: 400 },
  urlPhoto: String,
  isValid: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
  creatorId: Number,
  updaterId: Number,
  deleterId: Number
});

const userModel = db.model('User', schema);

export default userModel;
