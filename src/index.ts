// Develop: vmgabriel

"use strict";

// Libraries
import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as helmet from "helmet";
import * as dotenv from "dotenv";
import * as https from "https";
import * as fs from "fs";
const cors = require('cors');

// Connection DB
import { connect, disconnect } from './lib/db-connection';

// Error Middleware
import { logErrors, clientErrorHandler } from "./utils/middlewares/errorHandlers";

// If Route Not Found
import { notFound } from "./utils/middlewares/notfound.middleware";

// Constants
import config from "./config";

// Configuration for NODE_ENV
import envalid from "./utils/env";

// Configuration of Routes
import { IndexRoutes } from "./routes/index";
import { UserRoutes } from './routes/user';


/**
 * This class launch the service
 */
class Server {
  public app: express.Application;
  private env: any;
  private corsOptions: Object;

  // Routes Class
  private indexRoutes: IndexRoutes;
  private userRoutes: UserRoutes;

  constructor() {
    // Create Express Application
    this.app = express();

    // Configure Application
    this.config();

    // Core Options
    this.corsOptions = {
      // credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE" ],
      origin: true
    };

    // Validate environment
    this.env = envalid;

    // Initialize Routes
    this.indexRoutes = new IndexRoutes();
    this.userRoutes = new UserRoutes();

    // Method for Activate Routes
    this.routes();
  }


  /**
   * Configure my app
   */
  private config(): void {
    dotenv.config();
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(cors(this.corsOptions));

    this.app.set("port", config.port || 3001);
  }


  /**
   *  Configure the routes of my app
   */
  routes(): void {
    // Default route
    // const swaggerDocument = require("../swagger.json");

    this.app.use(`${this.indexRoutes.uri}`, this.indexRoutes.router);
    this.app.use(`${this.userRoutes.uri}`, this.userRoutes.router);
    // this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use(notFound);

     // Validate Errors -> Middleware of Routes
    this.errors();

    // Api Routes
    //this.app.use(validateRoutes.uri, validateRoutes.router);
  }


  /**
   * management of errors with middleware
   */
  private errors(): void {
    this.app.use(logErrors);
    this.app.use(clientErrorHandler);
  }

  public async initDb(isHttps: boolean) {
    try {
      const db = await connect();

      if (db) { this.open(isHttps); }
    } catch (error) {
      console.log('Error de Conexion Arango DB -> ', error);
    }
  }

  /**
   * Open the server in http
   */
  public open(isSecure: boolean = false) {
    let server: any;

    if (isSecure) {
      server = https.createServer({
        pfx: fs.readFileSync(config.routePFX),
        passphrase: config.sslKey
      }, this.app)
        .listen(this.app.get("port"), () => {
          console.log(`App listening on port ${this.app.get('port')}! Go to https://localhost:${this.app.get('port')}/`);
        });

    } else {
      server = this.app.listen(this.app.get("port"), () => {
        console.log(`Listening on http://localhost:${this.app.get("port")}`);
        process.on("SIGINT", () => {
          console.log("Bye bye!");
          process.exit();
        });
      });
    }

    // End Open Function
  }

  // End Class
}


// Initialize for server and open
const server = new Server();
server.initDb(config.isHttps === 'true');

// For funtionality of test
module.exports = server.app;
