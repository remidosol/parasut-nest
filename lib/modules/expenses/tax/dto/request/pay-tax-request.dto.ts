import { SingleRequest } from "../../../../../dto/request";
import { PaymentRequestResource } from "../../../bank-fee/dto/payment.attr";

export type PayTaxRequest = SingleRequest<PaymentRequestResource>;
