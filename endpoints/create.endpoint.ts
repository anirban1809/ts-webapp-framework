import { ApiEndpoint, body, HttpMethods, singleton } from "../lib";
import { BadRequestError } from "../lib/exceptions/http/badrequest.exception";

@singleton
export class CreateEndpoint<T> extends ApiEndpoint<any> {
  constructor() {
    super();
  }

  setup(): void {
    this.route = "/";
    this.method = HttpMethods.POST;
  }

  handler(@body() body: any) {
    console.log(body);
    if (body.id != "123") {
      throw new BadRequestError("Invalid id", {
        code: "INVALID_ID",
        message: "Invalid id",
      });
    }
    return { body };
  }
}
