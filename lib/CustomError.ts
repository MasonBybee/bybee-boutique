class CustomError extends Error {
  status: number;

  constructor(statusCode: number, message: string) {
    super();
    this.status = statusCode;
    this.message = message;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
