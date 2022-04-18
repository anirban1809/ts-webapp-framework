import { singleton } from "../../lib/decorators/di/di.decorators";
import { Logger } from "../../lib/logger/main.logger";

@singleton
export class HomeService {
  constructor(private logger: Logger) {}

  getHello(id: string, name: string, search: string) {
    this.logger.info(
      `Logging from home service: id: ${id}, name: ${name}, search: ${search}`
    );
    return {
      id,
      name,
      search,
    };
  }
}
