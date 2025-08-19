import { ParasutApiErrorResponse } from "../../dto/response";
import { ParasutException } from "./base.exception";

/**
 * ParasutBadRequestException is thrown when the Parasut API returns a 400 Bad Request error.
 * This usually indicates that the request was malformed or contained invalid data.
 */
export class ParasutBadRequestException extends ParasutException {
  constructor(message: ParasutApiErrorResponse) {
    super({
      status: 400,
      errors: message.errors,
    });
    this.name = "ParasutBadRequestException";
  }
}
