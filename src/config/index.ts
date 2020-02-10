// Develop: vmgabriel

"use strict";

// Libraries
import * as dotenv from "dotenv";

// Enable configuration of dotenv
dotenv.config();



/**
 * Configuration of environment for server
 */
const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,

  isHttps: process.env.USE_HTTPS,
  routePFX: process.env.ROUTE_PFX,
  sslKey: process.env.SSL_KEY,

  dbName: process.env.DB_NAME,
  userDb: process.env.USER_DB,
  passwordDb: process.env.PASSWORD_DB
};

export default config;
