import { Application } from "./lib";

declare module "./lib" {
  interface Application {}
}

export * from "./lib";
