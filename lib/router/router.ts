import { json, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiEndpoint } from "../api-endpoint/base.apiendpoint";
import { Application } from "../app";
import { activate } from "../dependeny-injection/di.container";
import { parameterMetadata } from "../globals";
import { Logger } from "../logger/main.logger";

const codeMessageMap: { [index: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
};

function getControllerArguments(req: {
  query: any;
  params: any;
  headers: any;
  body: any;
}) {
  let controllerArguments: any[] = [];
  controllerArguments[parameterMetadata.body] = req.body;
  Object.keys(parameterMetadata.query).forEach((param) => {
    controllerArguments[parameterMetadata.query[param]] = req.query[param];
  });
  Object.keys(parameterMetadata.header).forEach((param) => {
    controllerArguments[parameterMetadata.header[param]] = req.headers[param];
  });
  Object.keys(parameterMetadata.path).forEach((param) => {
    controllerArguments[parameterMetadata.path[param]] = req.params[param];
  });
  return controllerArguments;
}

export function registerEndpoint<T>(
  application: Application,
  controller: (abstract new (...args: any[]) => ApiEndpoint<T>) & {
    prototype: ApiEndpoint<T>;
  }
) {
  const controllerInstance = activate<ApiEndpoint<T>>(<any>controller);
  controllerInstance.setup();
  const path = controllerInstance.getRoute();
  const method = controllerInstance.getMethod();
  Logger.log(`Initialized ${method} route ${path}`);
  const app = application.getApp();
  switch (method) {
    case "GET":
      app.get(path, async (req: Request, res: Response) => {
        await createAndSendResponse<T>(req, controllerInstance, res);
      });
      break;
    case "POST":
      app.use(json());
      app.post(path, async (req: Request, res: Response) => {
        await createAndSendResponse<T>(req, controllerInstance, res);
      });
      break;
    case "PATCH":
      app.use(json());
      app.patch(path, async (req: Request, res: Response) => {
        await createAndSendResponse<T>(req, controllerInstance, res);
      });
      break;
    case "PUT":
      app.use(json());
      app.put(path, async (req: Request, res: Response) => {
        await createAndSendResponse<T>(req, controllerInstance, res);
      });
      break;
    case "DELETE":
      app.delete(path, async (req: Request, res: Response) => {
        await createAndSendResponse<T>(req, controllerInstance, res);
      });
      break;
    default:
      throw new Error(`Unsupported method ${method}`);
  }
}

async function createAndSendResponse<T>(
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  controllerInstance: ApiEndpoint<T>,
  res: Response<any, Record<string, any>>
) {
  let controllerArguments: any[] = getControllerArguments(req);
  console.log(controllerArguments);
  try {
    const controllerOutput: any = controllerInstance.handler(
      ...controllerArguments
    );
    console.log(controllerOutput);

    res.send(controllerOutput.then ? await controllerOutput : controllerOutput);
  } catch (err: any) {
    const code = err.code ?? 500;
    const message = err.message === "" ? codeMessageMap[code] : err.message;
    const error = err.error ?? {};
    res.status(code).send({
      code,
      message,
      error,
    });
  }
}
