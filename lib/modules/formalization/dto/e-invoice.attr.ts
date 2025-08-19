import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";

export type EInvoiceAttributes = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  invoice_id?: number;
};

export type EInvoiceResponseRels = {
  invoice?: ResponseRelationship<"sales_invoices">;
};

export type EInvoiceRequestResource = RequestResource<"e_invoices", any>;

export type EInvoiceResponseResource = ResponseResource<
  "e_invoices",
  EInvoiceAttributes,
  EInvoiceResponseRels
>;

type EInvoiceResponseRelInc = ResponseIncludedFrom<EInvoiceResponseResource>;

export type EInvoiceResponseIncluded =
  PromoteResponseIdentifiers<EInvoiceResponseRelInc>;
