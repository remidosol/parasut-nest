import { SingleResponse } from "../../../../../dto/response";
import {
  PaymentResponseIncluded,
  PaymentResponseResource,
} from "../../../bank-fee/dto/payment.attr";

export type PaySalaryResponse = SingleResponse<
  PaymentResponseResource,
  PaymentResponseIncluded[]
>;
