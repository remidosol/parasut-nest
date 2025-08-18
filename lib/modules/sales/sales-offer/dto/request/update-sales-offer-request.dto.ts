import { SingleRequest } from "../../../../../dto/request";
import { SalesOfferRequestResource } from "../sales-offer.attr";

export type UpdateSalesOfferRequest = Partial<
  SingleRequest<SalesOfferRequestResource>
>;
