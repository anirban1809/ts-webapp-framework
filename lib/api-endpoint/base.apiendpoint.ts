import { HttpMethods } from "../enums/httpmethod.enum";

export abstract class ApiEndpoint<T> {
  protected route!: string;
  protected method!: HttpMethods;
  public abstract setup(): void;
  public abstract handler(...args: any[]): T;

  constructor(...args: any[]) {}

  getRoute(): string {
    return this.route;
  }
  getMethod(): HttpMethods {
    return this.method;
  }
}
