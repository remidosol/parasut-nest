import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import {
  PurchaseBillResponseIncluded,
  PurchaseBillResponseResource,
} from "../purchase-bill.attr";

export type CreatePurchaseBillResponse = SingleResponse<
  PurchaseBillResponseResource,
  PurchaseBillResponseIncluded[]
>;

export type GetPurchaseBillResponse = SingleResponse<
  PurchaseBillResponseResource,
  PurchaseBillResponseIncluded[]
>;

export type UpdatePurchaseBillResponse = SingleResponse<
  PurchaseBillResponseResource,
  PurchaseBillResponseIncluded[]
>;

export type IndexPurchaseBillResponse = CollectionResponse<
  PurchaseBillResponseResource,
  PurchaseBillResponseIncluded[]
>;
