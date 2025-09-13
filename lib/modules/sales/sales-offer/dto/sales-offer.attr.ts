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
  activities?: ResponseRelationship<"activities", true>;
  sharings?: ResponseRelationship<"sharings", true>;
  details?: ResponseRelationship<"sales_offer_details", true>;
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

// Added: detail response resource and product include
export type SalesOfferDetailAttributes = {
  description: string;
  net_total: number;
  unit_price: number;
  vat_rate: number;
  quantity: number;
  discount_type: string;
  discount_value: number;
  communications_tax_rate: number;
  excise_duty_type: string;
  invoice_discount: number;
  excise_duty: number;
  excise_duty_rate: number;
  discount: number;
  communications_tax: number;
  detail_no: number;
  net_total_without_invoice_discount: number;
  vat_withholding: number;
  vat_withholding_rate: number;
  accommodation_tax_rate: number;
  accommodation_tax: number;
  accommodation_tax_exempt: boolean;
  created_at: string;
  updated_at: string;
  excise_duty_value: number;
};

export type SalesOfferDetailResponseRels = {
  product?: ResponseRelationship<"products">;
};

export type SalesOfferDetailResponseResource = ResponseResource<
  "sales_offer_details",
  SalesOfferDetailAttributes,
  SalesOfferDetailResponseRels
>;

type SalesOfferDetailResponseRelInc =
  ResponseIncludedFrom<SalesOfferDetailResponseResource>;

export type SalesOfferDetailResponseIncluded =
  PromoteResponseIdentifiers<SalesOfferDetailResponseRelInc>;

// Sharing request/response resources
export type SharingFormRequestAttributes = {
  email?: {
    addresses?: string;
    subject?: string;
    body?: string;
  };
  portal?: {
    has_online_collection?: boolean;
    has_online_payment_reminder?: boolean;
    has_referral_link?: boolean;
  };
  properties?: Record<string, any>;
};

export type SharingFormRequestResource = RequestResource<
  "sharing_forms",
  SharingFormRequestAttributes,
  {
    shareable: RequestRelationship<"sales_offers">;
  }
>;

export type SharingAttributes = {
  created_at: string;
  email: string;
  email_status: string;
  message: string;
  properties: Record<string, any>;
  subject: string;
  updated_at: string;
};

export type SharingResponseRels = {
  shareable?: ResponseRelationship<"shareable">;
  collaborator?: ResponseRelationship<"collaborators">;
};

export type SharingResponseResource = ResponseResource<
  "sharings",
  SharingAttributes,
  SharingResponseRels
>;

type SharingResponseRelInc = ResponseIncludedFrom<SharingResponseResource>;

export type SharingResponseIncluded =
  PromoteResponseIdentifiers<SharingResponseRelInc>;
