import { activate } from "../../dependeny-injection/di.container";
import { singletons } from "../../globals";

export function singleton(target: any) {
  singletons[target.name] = activate(target);
}

export function container(target: any) {
  Reflect.getMetadata("design:paramtypes", target).map((type: any) =>
    activate(type)
  );
}
