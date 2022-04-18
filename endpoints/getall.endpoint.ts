import { query } from "../lib";
import { ApiEndpoint } from "../lib/api-endpoint/base.apiendpoint";
import { singleton } from "../lib/decorators/di/di.decorators";
import { HttpMethods } from "../lib/enums/httpmethod.enum";
import { HomeService } from "../services/home/home.service";

@singleton
export class GetAllEndpoint<T> extends ApiEndpoint<any> {
  constructor(private homeService: HomeService) {
    super();
  }

  setup(): void {
    this.route = "/";
    this.method = HttpMethods.GET;
  }

  handler(@query("id") id: string) {
    console.log(JSON.stringify(id));
    return this.homeService.getHello(id, "", "");
  }
}
