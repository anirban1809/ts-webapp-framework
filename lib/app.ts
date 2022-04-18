import express from "express";
import { ApiEndpoint } from "./api-endpoint/base.apiendpoint";
import { Logger } from "./logger/main.logger";
import { registerEndpoint } from "./router/router";

// export const app = express();

export class Application {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  /**
   * Starts the application.
   */
  bootstrap(): void;

  /**
   * Starts the application.
   * @param port The port to listen on.
   */
  bootstrap(port: number): void;

  /**
   * Starts the application.
   * @param port The port to listen on.
   */
  bootstrap(port?: number): void {
    this.app.use(express.json());
    this.app.listen(port ?? 3000, () =>
      Logger.log(`Listening on port ${port ?? 3000}`)
    );
  }

  /**
   * Returns the express application.
   * @returns The express application.
   */
  getApp(): express.Application {
    return this.app;
  }

  /**
   * Registers the given endpoints with the application.
   * @param endpoints The endpoints to register.
   */
  registerEndpoints(
    endpoints: ((abstract new (...args: any[]) => ApiEndpoint<unknown>) & {
      prototype: ApiEndpoint<any>;
    })[]
  ) {
    endpoints.forEach((endpoint) => {
      registerEndpoint(this, endpoint);
    });
  }
}
