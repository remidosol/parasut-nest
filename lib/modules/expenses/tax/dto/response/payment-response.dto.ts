import { SingleResponse } from "../../../../../dto/response";
import {
  PaymentResponseIncluded,
  PaymentResponseResource,
} from "../../../bank-fee/dto/payment.attr";

export type PayTaxResponse = SingleResponse<
  PaymentResponseResource,
  PaymentResponseIncluded[]
>;
