export class BadRequestError extends Error {
  code: number;
  error: any;
  constructor(error?: any);
  constructor(message: string, error?: any);
  constructor(message?: string, error?: any) {
    super(message);
    this.code = 400;
    this.error = error;
  }
}
