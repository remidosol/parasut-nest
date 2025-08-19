import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import {
  SalesOfferResponseIncluded,
  SalesOfferResponseResource,
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

export type IndexSalesOfferResponse = CollectionResponse<
  SalesOfferResponseResource,
  SalesOfferResponseIncluded[]
>;
