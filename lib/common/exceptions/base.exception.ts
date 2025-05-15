import { HttpException } from "@nestjs/common";
import { ParasutApiErrorResponse } from "../../dto/response";

/**
 * ParasutException is the base class for all exceptions thrown by the Parasut library.
 * It extends the HttpException class from NestJS.
 * This exception is used to handle errors returned by the Parasut API.
 */
export class ParasutException extends HttpException {
  constructor(message: ParasutApiErrorResponse & { status: number }) {
    super(message, message.status);
    this.name = "ParasutException";
  }
}
