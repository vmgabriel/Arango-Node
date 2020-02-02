// Develop: vmgabriel

"use strict";

// Libraries
import * as express from "express";

/**
 * Route base
 *
 **/
export class IndexRoutes {
  public router: express.Router;
  public uri: string;

  /**
   * Extends RouteApi with super construct and put uri
   **/
  constructor() {
    this.router = express.Router();
    this.uri = "";

    this.config();
  }

  /**
   *  Configure the routes of my indexRoute
   **/
  public config(): void {
    this.showBaseApi();
    this.showAboutApi();

    // End config function
  }

  /**
   * Method for show Base Api
   **/
  public showBaseApi() {
    this.router.get(
      "/",
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send({ message: 'API - Project DagaCont' });
      }
    );
  }

  /**
   * Route for get /about -> default route for know api
   **/
  public  showAboutApi() {
    this.router.get(
      "/about",
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let message: string;
        message = `
        Project DagaCont
        Con todo el buen animo y Disposicion, toda la energia puesta a este proyecto.
        `;
        res.send({ message });
      }
    );
  }

  // End Class
}
