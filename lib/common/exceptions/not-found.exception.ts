import { ParasutApiErrorResponse } from "../../dto/response";
import { ParasutException } from "./base.exception";

/**
 * ParasutNotFoundException is thrown when the Parasut API returns a 404 Not Found error.
 * This usually indicates that the requested resource could not be found.
 */
export class ParasutNotFoundException extends ParasutException {
  constructor(message: ParasutApiErrorResponse) {
    super({
      status: 404,
      errors: message.errors,
    });
    this.name = "ParasutNotFoundException";
  }
}
