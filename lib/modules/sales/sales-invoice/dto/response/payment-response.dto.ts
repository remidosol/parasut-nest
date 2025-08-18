import { SingleResponse } from "../../../../../dto/response";
import {
  PaymentResponseIncluded,
  PaymentResponseResource,
} from "../../../../expenses/bank-fee/dto/payment.attr";

export type PaySalesInvoiceResponse = SingleResponse<
  PaymentResponseResource,
  PaymentResponseIncluded[]
>;
