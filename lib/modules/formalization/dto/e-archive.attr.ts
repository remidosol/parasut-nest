import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";

export type EArchiveAttributes = {
  id: string;
  type: "e_archives";
  uuid: string;
  vkn: string;
  invoice_number: string;
  note: string;
  is_printed: boolean;
  status: "bounced" | "sent" | "printed" | "legalized";
  printed_at: string; // ISO 8601
  cancellable_until: string; // ISO 8601
  is_signed: boolean;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
};

export type EArchiveRequestAttributes = {
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
  internet_sale?: {
    url?: string;
    payment_type?:
      | "KREDIKARTI/BANKAKARTI"
      | "EFT/HAVALE"
      | "KAPIDAODEME"
      | "ODEMEARACISI";
    payment_platform?: string;
    payment_date?: string;
  };
  shipment?: {
    title?: string;
    vkn?: string;
    name?: string;
    tckn?: string;
    date?: string;
  };
};

export type EArchiveResponseRels = {
  sales_invoice?: ResponseRelationship<"sales_invoices">;
};

export type EArchiveRequestRels = {
  sales_invoice?: {
    data: {
      type: "sales_invoices";
      id: string;
    };
  };
};

export type EArchiveRequestResource = RequestResource<
  "e_archives",
  EArchiveRequestAttributes,
  EArchiveRequestRels
>;

export type EArchiveResponseResource = ResponseResource<
  "e_archives",
  EArchiveAttributes,
  EArchiveResponseRels
>;

type EArchiveResponseRelInc = ResponseIncludedFrom<EArchiveResponseResource>;

export type EArchiveResponseIncluded =
  PromoteResponseIdentifiers<EArchiveResponseRelInc>;
