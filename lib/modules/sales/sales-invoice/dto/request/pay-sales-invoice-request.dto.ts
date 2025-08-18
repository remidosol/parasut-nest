import { SingleRequest } from "../../../../../dto/request";
import { PaymentRequestResource } from "../../../../expenses/bank-fee/dto/payment.attr";

export type PaySalesInvoiceRequest = SingleRequest<PaymentRequestResource>;
