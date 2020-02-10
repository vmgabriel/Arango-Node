// Develop: vmgabriel

"use strict";

// Libraries
import * as express from "express";

// Services
import { UserService } from '../services/user';

// Interfaces
import { IUser } from '../interfaces/user';

/**
 * Route for User Routes
 **/
export class UserRoutes {
  public router: express.Router;
  public uri: string;
  private service: UserService;

  /**
   * Extends RouteApi with super construct and put uri
   **/
  constructor() {
    this.router = express.Router();
    this.uri = "/users";

    this.service = new UserService();

    this.config();
  }

  /**
   *  Configure the routes of my indexRoute
   **/
  public config(): void {
    this.create();
    this.findUserById();
    this.updateUser();
    this.deleteUser();
    // End config function
  }

  /**
   * Method for show Base Api
   **/
  public create() {
    this.router.post(
      "/",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          const model : Partial<IUser> = req.body;
          const data = await this.service.create(model);
          res.status(201).send({ message: 'Done Correctly', code: 201, data });
        } catch (err) {
          next(err);
        }
      }
    );
  }

  /** Find User By Id Route */
  public findUserById() {
    this.router.get(
      "/profile/:id",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          const userId = req.params;
          if (userId) {
            let data = await this.service.findById(userId.id);
            res.status(200).send(data);
          } else {
            next({ code: 400, error: "Datos invalidos" });
          }
        } catch (err) {
          next(err);
        }
      }
    );
 }

  /** Update User By Id */
  public updateUser() {
    this.router.put(
      "/:id",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          const userId = req.params;
          if (userId) {
            const modelUpdated : Partial<IUser> = req.body;
            let data = await this.service.update(userId.id, modelUpdated);
            res.status(200).send(data);
          } else {
            next({ code: 400, error: "Datos invalidos" });
          }
        } catch (err) {
          next(err);
        }
      }
    );
  }

  /** Delete User By Id  */
  public deleteUser() {
    this.router.put(
      "/remove/:id",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          const userId = req.params;
          if (userId) {
            let data = await this.service.delete(userId.id);
            res.status(200).send(data);
          } else {
            next({ code: 400, error: "Datos invalidos" });
          }
        } catch (err) {
          next(err);
        }
      }
    );
  }
  // End Class
}
