import { SingleResponse } from "../../../../../dto/response";
import {
  PaymentResponseIncluded,
  PaymentResponseResource,
} from "../../../bank-fee/dto/payment.attr";

export type PayPurchaseBillResponse = SingleResponse<
  PaymentResponseResource,
  PaymentResponseIncluded[]
>;
