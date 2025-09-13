import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";

export type EInvoiceAttributes = {
  external_id: string;
  uuid: string;
  env_uuid: string;
  from_address: string;
  from_vkn: string;
  to_address: string;
  to_vkn: string;
  direction: "inbound" | "outbound";
  note: string;
  response_type: "accepted" | "rejected" | "refunded";
  contact_name: string;
  scenario: "basic" | "commercial";
  status: "waiting" | "failed" | "successful";
  gtb_ref_no: string; // GTB Referans Numarası
  gtb_registration_no: string;
  gtb_export_date: string; // ISO 8601 date format
  response_note: string;
  issue_date: string; // ISO 8601 date format
  is_expired: boolean;
  is_answerable: boolean;
  net_total: number;
  currency: "TRL" | "USD" | "EUR" | "GBP";
  item_type: "refund" | "invoice";
  created_at: string; // ISO 8601 date format
  updated_at: string; // ISO 8601 date format
};

export type EInvoiceRequestAttributes = {
  vat_withholding_params?: Array<{
    detail_id: number;
    vat_withholding_code: string;
  }>;
  vat_exemption_reason_code?: string;
  vat_exemption_reason?: string;
  excise_duty_codes?: Array<{
    product: number;
    sales_excise_duty_code: number;
  }>;
  scenario: "basic" | "commercial";
  to: string;
  custom_requirement_params?: {
    integration: {
      data: Record<string, any>;
    };
  };
};

export type EInvoiceResponseRels = {
  invoice?: ResponseRelationship<"sales_invoices">;
};

export type EInvoiceRequestRels = {
  invoice?: {
    data: {
      type: "sales_invoices";
      id: string;
    };
  };
};

export type EInvoiceRequestResource = RequestResource<
  "e_invoices",
  EInvoiceRequestAttributes,
  EInvoiceRequestRels
>;

export type EInvoiceResponseResource = ResponseResource<
  "e_invoices",
  EInvoiceAttributes,
  EInvoiceResponseRels
>;

type EInvoiceResponseRelInc = ResponseIncludedFrom<EInvoiceResponseResource>;

export type EInvoiceResponseIncluded =
  PromoteResponseIdentifiers<EInvoiceResponseRelInc>;
