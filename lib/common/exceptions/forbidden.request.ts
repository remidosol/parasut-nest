import { ParasutApiErrorResponse } from "../../dto/response";
import { ParasutException } from "./base.exception";

/**
 * ParasutForbiddenException is thrown when the Parasut API returns a 403 Forbidden error.
 * This usually indicates that the user does not have permission to access the requested resource.
 */
export class ParasutForbiddenException extends ParasutException {
  constructor(message: ParasutApiErrorResponse) {
    super({
      status: 403,
      errors: message.errors,
    });
    this.name = "ParasutForbiddenException";
  }
}
