import { SingleRequest } from "../../../../../dto/request";
import { PurchaseBillRequestResource } from "../purchase-bill.attr";

export type UpdatePurchaseBillRequest = Partial<
  SingleRequest<PurchaseBillRequestResource>
>;
