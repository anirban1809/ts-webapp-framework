import { singleton } from "../../lib/decorators/di/di.decorators";
import { body, path, query } from "../../lib/decorators/http/http.decorators";
import { BadRequestError } from "../../lib/exceptions/http/badrequest.exception";
import { Logger } from "../../lib/logger/main.logger";
import { HomeService } from "../../services/home/home.service";

@singleton
export class HomeController {
  homeService: HomeService;
  constructor(homeService: HomeService, private logger: Logger) {
    this.homeService = homeService;
  }

  getHello(
    @path("id") id: string,
    @path("name") name: string,
    @query("q") search: string
  ) {
    if (id != "23") {
      this.logger.info("Failed to get id");
      throw new BadRequestError();
    }
    return this.homeService.getHello(id, name, search);
  }

  createHello(@body() body: any) {
    return { name: body.name };
  }
}
