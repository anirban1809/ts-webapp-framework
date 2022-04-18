import { path } from "../lib";
import { ApiEndpoint } from "../lib/api-endpoint/base.apiendpoint";
import { singleton } from "../lib/decorators/di/di.decorators";
import { HttpMethods } from "../lib/enums/httpmethod.enum";
import { HomeService } from "../services/home/home.service";

@singleton
export class GetEndpoint<T> extends ApiEndpoint<any> {
  constructor(private homeService: HomeService) {
    super();
  }

  setup(): void {
    this.route = "/:id";
    this.method = HttpMethods.GET;
  }

  handler(@path("id") id: string): any {
    return {
      id,
    };
  }
}
