import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseResource,
} from "../../../types";

export type EInvoiceInboxAttributes = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  vkn?: string;
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
