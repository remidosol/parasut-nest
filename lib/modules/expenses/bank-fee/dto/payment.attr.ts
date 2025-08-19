import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../../types";

export type PaymentRequestAttributes = {
  description?: string;
  account_id?: number;
  date?: Date;
  amount?: number;
  exchange_rate?: number;
};

export type PaymentRequestResource = RequestResource<
  "payments",
  PaymentRequestAttributes
>;

export type PaymentResponseAttributes = {
  created_at?: Date;
  updated_at?: Date;
  date?: Date;
  amount?: number;
  currency?: number;
  notes?: string;
};

export type PaymentResponseRels = {
  payable?: ResponseRelationship<
    | "sales_invoices"
    | "purchase_bills"
    | "taxes"
    | "bank_fees"
    | "salaries"
    | "checks"
  >;
  transaction?: ResponseRelationship<"transactions">;
};

export type PaymentResponseResource = ResponseResource<
  "payments",
  PaymentResponseAttributes,
  PaymentResponseRels
>;

type PaymentResponseRelInc = ResponseIncludedFrom<PaymentResponseResource>;

export type PaymentResponseIncluded =
  PromoteResponseIdentifiers<PaymentResponseRelInc>;
