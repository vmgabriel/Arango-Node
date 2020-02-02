// #  /$$$$$$$            /$$                   /$$
// # | $$__  $$          | $$                  | $$
// # | $$  \ $$  /$$$$$$ | $$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$$
// # | $$$$$$$/ /$$__  $$| $$__  $$ /$$__  $$|_  $$_/   /$$__  $$ /$$_____/
// # | $$__  $$| $$  \ $$| $$  \ $$| $$  \ $$  | $$    | $$$$$$$$| $$
// # | $$  \ $$| $$  | $$| $$  | $$| $$  | $$  | $$ /$$| $$_____/| $$
// # | $$  | $$|  $$$$$$/| $$$$$$$/|  $$$$$$/  |  $$$$/|  $$$$$$$|  $$$$$$$
// # |__/  |__/ \______/ |_______/  \______/    \___/   \_______/ \_______/

// Develop: vmgabriel

"use strict";

// Libraries
//import orango from 'orango';
const orango = require('orango');

// Constants
import config from "../config";

// DB
// const { EVENTS } = orango.consts;
const db = orango.get(config.dbName);

// we are connected, but orango has not initialized the models
// db.events.once(EVENTS.CONNECTED, conn => {
//   console.log('Connected to ArangoDB:', conn.url + '/' + conn.name);
// });

// // everything is initialized and we are ready to go
// db.events.once(EVENTS.READY, () => {
//   console.log('Orango is ready!');
// });

let instance: any = null;
let isDisconnecting = false;

/**
 * Connect to mongo client
 */
export const connect = () => {
  return new Promise(async (resolve, reject) => {
    this.instance = await db.connect({ username: config.userDb, password: config.passwordDb });
    if (db.connection.connected) {
      console.dir("Conectado Satisfactoriamente");
      resolve(db.connection.connected);
    } else {
      reject(new Error("Conexion no Satisfactoria"));
    }
  });
};

/**
 * Disconnect from mongo client
 */
export const disconnect = (): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    if (instance && !isDisconnecting) {

      isDisconnecting = true;
      const dataDisconect = await orango.disconnect();
      console.log(dataDisconect);
      if (db.connection.connected) {
        console.dir("Desconectado Satisfactoriamente");
        resolve(instance);
      } else {
        reject(new Error("Desconexion no Satisfactoria"));
      }
    } else {
      reject('No hay una conexión activa a la base de datos');
    }
  });
};
