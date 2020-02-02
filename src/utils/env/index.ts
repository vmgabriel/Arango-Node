// Develop: vmgabriel

"use strict";

// libraries
import * as dotenv from "dotenv";
import * as envalid from "envalid";

// Enable configuration of dotenv
dotenv.config();

/**
 * envalid behavior for env vars
 * @param  process.env vars env
 */
const env = envalid.cleanEnv(process.env, {
  PORT: envalid.port(),

  USE_HTTPS: envalid.bool(),
  ROUTE_PFX: envalid.str(),
  SSL_KEY: envalid.str(),

  DB_NAME: envalid.str(),
  USER_DB: envalid.str(),
  PASSWORD_DB: envalid.str()
});

export default env;

