import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import {
  SalesInvoiceResponseIncluded,
  SalesInvoiceResponseResource,
} from "../sales-invoice.attr";

export type CreateSalesInvoiceResponse = SingleResponse<
  SalesInvoiceResponseResource,
  SalesInvoiceResponseIncluded[]
>;

export type GetSalesInvoiceResponse = SingleResponse<
  SalesInvoiceResponseResource,
  SalesInvoiceResponseIncluded[]
>;

export type UpdateSalesInvoiceResponse = SingleResponse<
  SalesInvoiceResponseResource,
  SalesInvoiceResponseIncluded[]
>;

export type IndexSalesInvoiceResponse = CollectionResponse<
  SalesInvoiceResponseResource,
  SalesInvoiceResponseIncluded[]
>;
