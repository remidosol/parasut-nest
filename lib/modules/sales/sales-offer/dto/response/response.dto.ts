import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import {
  SalesOfferDetailResponseIncluded,
  SalesOfferDetailResponseResource,
  SalesOfferResponseIncluded,
  SalesOfferResponseResource,
  SharingResponseIncluded,
  SharingResponseResource,
} from "../sales-offer.attr";

export type CreateSalesOfferResponse = SingleResponse<
  SalesOfferResponseResource,
  SalesOfferResponseIncluded[]
>;

export type GetSalesOfferResponse = SingleResponse<
  SalesOfferResponseResource,
  SalesOfferResponseIncluded[]
>;

export type UpdateSalesOfferResponse = SingleResponse<
  SalesOfferResponseResource,
  SalesOfferResponseIncluded[]
>;

// The update status endpoint returns the same sales offer resource with activities included
export type UpdateSalesOfferStatusResponse = SingleResponse<
  SalesOfferResponseResource,
  SalesOfferResponseIncluded[]
>;

export type IndexSalesOfferResponse = CollectionResponse<
  SalesOfferResponseResource,
  SalesOfferResponseIncluded[]
>;

export type GetSalesOfferDetailsResponse = SingleResponse<
  SalesOfferDetailResponseResource,
  SalesOfferDetailResponseIncluded[]
>;

export * from "./sales-offer-pdf-response.dto";

export type ShareSalesOfferByEmailResponse = CollectionResponse<
  SharingResponseResource,
  SharingResponseIncluded[]
>;
