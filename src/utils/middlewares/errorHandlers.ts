// #  /$$$$$$$            /$$                   /$$                                /$$$$$$      /$$$$$$
// # | $$__  $$          | $$                  | $$                               /$$__  $$    /$$__  $$
// # | $$  \ $$  /$$$$$$ | $$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$$      | $$  \__/   | $$  \ $$
// # | $$$$$$$/ /$$__  $$| $$__  $$ /$$__  $$|_  $$_/   /$$__  $$ /$$_____/      |  $$$$$$    | $$$$$$$$
// # | $$__  $$| $$  \ $$| $$  \ $$| $$  \ $$  | $$    | $$$$$$$$| $$             \____  $$   | $$__  $$
// # | $$  \ $$| $$  | $$| $$  | $$| $$  | $$  | $$ /$$| $$_____/| $$             /$$  \ $$   | $$  | $$
// # | $$  | $$|  $$$$$$/| $$$$$$$/|  $$$$$$/  |  $$$$/|  $$$$$$$|  $$$$$$$      |  $$$$$$//$$| $$  | $$ /$$
// # |__/  |__/ \______/ |_______/  \______/    \___/   \_______/ \_______/       \______/|__/|__/  |__/|__/

// Develop: vmgabriel

"use strict";

// Libraries
import * as express from "express";
import { IErrorCustom } from "../../interfaces/error.interface";

/**
 * Show errors in console for develop
 * @params {IErrorCustom} err Type for use in Errors
 * @params {Request} req Express method for middleware consult
 * @params {Response} res Express method for middleware consult
 * @params {NextFunction} next Express method for middleware consult
 */
export function logErrors(err: IErrorCustom, req: express.Request, res: express.Response,
                          next: express.NextFunction) {
  console.log("Error:::", err);
  next(err);
}


/**
 * Show message Error for user
 * @params {IErrorCustom} err Type for use in Errors
 * @params {Request} req Express method for middleware consult
 * @params {Response} res Express method for middleware consult
 * @params {NextFunction} next Express method for middleware consult
 */
export function clientErrorHandler(err: IErrorCustom, req: express.Request,
                                   res: express.Response, next: express.NextFunction) {
  console.log("Next Error in Class Client: ", next);

  let errorResponse: IErrorCustom = {
    code: err.code || 500,
    error: err.error || err.message || "An error ocurrs"
  };

  res.status(errorResponse.code).json(errorResponse);
}

module.exports = {
  logErrors,
  clientErrorHandler
};
