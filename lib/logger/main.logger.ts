import { singleton } from "../decorators/di/di.decorators";

@singleton
export class Logger {
  settings: any;

  constructor() {}

  static log(message: string, ...args: any[]) {
    console.log(`[${new Date().toISOString()}] :: `, message, ...args);
  }

  info(message: string, ...args: any[]) {
    console.log(`[${new Date().toISOString()}] :: `, message, ...args);
  }
}
