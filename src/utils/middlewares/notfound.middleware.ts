
// Develop: vmgabriel

"use strict";

// Libraries
import { Request, Response, NextFunction} from "express";
import { IErrorCustom } from "../../interfaces/error.interface";

/**
 * Control of Validation of Route if not is valid
 * @params {IErrorCustom} err Type for use in Errors
 * @params {Request} req Express method for middleware consult
 * @params {Response} res Express method for middleware consult
 * @params {NextFunction} next Express method for middleware consult
 */
export function notFound(req: Request, res: Response, next: NextFunction) {
  const message404: IErrorCustom = { code: 404, error: 'route not found' };
  next(message404);
}
