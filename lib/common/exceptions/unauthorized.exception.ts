import { ParasutApiErrorResponse } from "../../dto/response";
import { ParasutException } from "./base.exception";

/**
 * ParasutUnauthorizedException is thrown when the Parasut API returns a 401 Unauthorized error.
 * This usually indicates that the access token is invalid or expired.
 */
export class ParasutUnauthorizedException extends ParasutException {
  constructor(message: ParasutApiErrorResponse) {
    super({
      status: 401,
      errors: message.errors,
    });
    this.name = "ParasutUnauthorizedException";
  }
}
