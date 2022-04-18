import "reflect-metadata";
import { singletons } from "../globals";

export function activate<T>(type: { new (...args: any[]): T }): T {
  if (singletons[type.name]) {
    return singletons[type.name];
  }

  const dependencies = Reflect.getMetadata("design:paramtypes", type).map(
    (x: new (...args: any[]) => unknown) => {
      singletons[type.name] = activate(x);
      return singletons[type.name];
    }
  );

  return new type(...dependencies);
}
