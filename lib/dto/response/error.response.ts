export type ParasutApiError = {
  title: string;
  detail: string;
};

/**
 * ParasutException is the base class for all exceptions thrown by the Parasut library.
 */
export class ParasutApiErrorResponse {
  errors!: ParasutApiError[];
}
