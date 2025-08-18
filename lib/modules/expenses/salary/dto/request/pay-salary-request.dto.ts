import { SingleRequest } from "../../../../../dto/request";
import { PaymentRequestResource } from "../../../bank-fee/dto/payment.attr";

export type PaySalaryRequest = SingleRequest<PaymentRequestResource>;
