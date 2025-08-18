import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import { TaxResponseIncluded, TaxResponseResource } from "../tax.attr";

export type CreateTaxResponse = SingleResponse<
  TaxResponseResource,
  TaxResponseIncluded[]
>;

export type GetTaxResponse = SingleResponse<
  TaxResponseResource,
  TaxResponseIncluded[]
>;

export type UpdateTaxResponse = SingleResponse<
  TaxResponseResource,
  TaxResponseIncluded[]
>;

export type IndexTaxResponse = CollectionResponse<
  TaxResponseResource,
  TaxResponseIncluded[]
>;
