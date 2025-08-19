import {
  PromoteResponseIdentifiers,
  RequestRelationship,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../../types";

export type SalesOfferAttributes = {
  content?: string;
  contact_type?: string;
  sharings_count?: number;
  status?: string;
  display_exchange_rate_in_pdf?: boolean;
  archived?: boolean;
  net_total?: number;
  gross_total?: number;
  withholding?: number;
  total_excise_duty?: number;
  total_communications_tax?: number;
  total_accommodation_tax?: number;
  total_vat?: number;
  total_vat_withholding?: number;
  vat_withholding?: number;
  total_discount?: number;
  total_invoice_discount?: number;
  description?: string;
  issue_date: Date;
  due_date?: Date;
  currency?: "TRL" | "USD" | "EUR" | "GBP";
  exchange_rate?: number;
  withholding_rate?: number;
  invoice_discount_type?: "percentage" | "amount";
  invoice_discount?: number;
  billing_address?: string;
  billing_phone?: string;
  billing_fax?: string;
  tax_office?: string;
  tax_number?: string;
  city?: string;
  district?: string;
  is_abroad?: boolean;
  order_no?: string;
  order_date?: Date;
};
export type SalesOfferRequestAttributes = Omit<
  SalesOfferAttributes,
  | "net_total"
  | "gross_total"
  | "withholding"
  | "total_excise_duty"
  | "total_communications_tax"
  | "total_accommodation_tax"
  | "total_vat"
  | "total_vat_withholding"
  | "vat_withholding"
>;

export type SalesOfferRequestRels = {
  contact?: RequestRelationship<"contacts">;
  details?: RequestRelationship<"sales_offer_details", true>;
};

export type SalesOfferRequestResource = RequestResource<
  "sales_offers",
  SalesOfferRequestAttributes,
  SalesOfferRequestRels
>;

export type SalesOfferResponseRels = {
  contact?: ResponseRelationship<"contacts">;
  sales_invoice?: ResponseRelationship<"sales_invoices">;
};

export type SalesOfferResponseResource = ResponseResource<
  "sales_offers",
  SalesOfferAttributes,
  SalesOfferResponseRels
>;

type SalesOfferResponseRelInc =
  ResponseIncludedFrom<SalesOfferResponseResource>;

export type SalesOfferResponseIncluded =
  PromoteResponseIdentifiers<SalesOfferResponseRelInc>;
