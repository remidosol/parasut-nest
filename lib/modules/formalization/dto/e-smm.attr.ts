import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";

export type ESmmAttributes = {
  created_at: string; // ISO 8601 date format
  updated_at: string; // ISO 8601 date format
  printed_at: string; // ISO 8601 date format
  uuid: string;
  vkn: string;
  invoice_number: number;
  is_printed: boolean;
  pdf_url: string;
};

export type ESmmResponseRels = {
  sales_invoice?: ResponseRelationship<"sales_invoices">;
};

export type ESmmRequestAttributes = {
  vat_withholding_code: string;
  note: string;
};

export type ESmmRequestRels = {
  sales_invoice: {
    data: {
      type: "sales_invoices";
      id: string;
    };
  };
};

export type ESmmRequestResource = RequestResource<
  "e_smms",
  ESmmRequestAttributes,
  ESmmRequestRels
>;

export type ESmmResponseResource = ResponseResource<
  "e_smms",
  ESmmAttributes,
  ESmmResponseRels
>;

type ESmmResponseRelInc = ResponseIncludedFrom<ESmmResponseResource>;

export type ESmmResponseIncluded =
  PromoteResponseIdentifiers<ESmmResponseRelInc>;
