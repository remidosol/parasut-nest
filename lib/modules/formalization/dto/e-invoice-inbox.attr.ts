import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseResource,
} from "../../../types";

export type EInvoiceInboxAttributes = {
  vkn: string;
  e_invoice_address: string;
  name: string;
  inbox_type: string;
  address_registered_at: string; // ISO 8601
  registered_at: string; // ISO 8601
  created_at: string; // ISO 8601 date format
  updated_at: string; // ISO 8601 date format
};

export type EInvoiceInboxRequestResource = RequestResource<
  "e_invoice_inboxes",
  any
>;

export type EInvoiceInboxResponseResource = ResponseResource<
  "e_invoice_inboxes",
  EInvoiceInboxAttributes
>;

type EInvoiceInboxResponseRelInc =
  ResponseIncludedFrom<EInvoiceInboxResponseResource>;

export type EInvoiceInboxResponseIncluded =
  PromoteResponseIdentifiers<EInvoiceInboxResponseRelInc>;
