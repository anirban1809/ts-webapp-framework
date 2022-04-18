import "reflect-metadata";
import { parameterMetadata } from "../../globals";
export function query(property: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    parameterMetadata.query[property] = parameterIndex;
  };
}

export function header(property: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    parameterMetadata.header[property] = parameterIndex;
  };
}

export function path(property: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    parameterMetadata.path[property] = parameterIndex;
  };
}

export function body() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    parameterMetadata.body = parameterIndex;
  };
}
