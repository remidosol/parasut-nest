import { ParasutApiErrorResponse } from "../../dto/response";
import { ParasutException } from "./base.exception";

/**
 * ParasutUnprocessableEntityException is thrown when the Parasut API returns a 422 Unprocessable Entity error.
 * This usually indicates that the request was well-formed but was unable to be followed due to semantic errors.
 */
export class ParasutUnprocessableEntityException extends ParasutException {
  constructor(message: ParasutApiErrorResponse) {
    super({
      status: 422,
      errors: message.errors,
    });
    this.name = "ParasutUnprocessableEntityException";
  }
}
