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
 *
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
        } catch(err) {
          next(err);
        }
      }
    );
  }

  // End Class
}
