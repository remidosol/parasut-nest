import { SingleResponse } from "../../../../../dto/response";
import {
  PaymentResponseIncluded,
  PaymentResponseResource,
} from "../payment.attr";

export type PayBankFeeResponse = SingleResponse<
  PaymentResponseResource,
  PaymentResponseIncluded[]
>;
