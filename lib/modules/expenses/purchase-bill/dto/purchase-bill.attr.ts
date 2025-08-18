import {
  PromoteResponseIdentifiers,
  RequestRelationship,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../../types";

export type PurchaseBillResponseAttributes = {
  archived?: boolean;
  total_paid?: number;
  gross_total?: number;
  total_excise_duty?: number;
  total_communications_tax?: number;
  total_vat: number;
  total_vat_withholding?: number;
  total_discount?: number;
  total_invoice_discount?: number;
  remaining?: number;
  remaining_in_trl?: number;
  payment_status?: string;
  is_detailed?: boolean;
  sharings_count?: number;
  e_invoices_count?: number;
  remaining_reimbursement?: number;
  remaining_reimbursement_in_trl?: number;
  created_at?: Date;
  updated_at?: Date;
  item_type:
    | "purchase_bill"
    | "cancelled"
    | "recurring_purchase_bill"
    | "refund";
  description?: string;
  issue_date: Date;
  due_date: Date;
  invoice_no?: string;
  currency: "TRL" | "USD" | "EUR" | "GBP";
  exchange_rate?: number;
  net_total: number;
  withholding_rate?: number;
  invoice_discount_type?: string;
  invoice_discount?: number;
};

export type PurchaseBillRequestAttributes = Exclude<
  PurchaseBillResponseAttributes,
  | "archived"
  | "total_paid"
  | "gross_total"
  | "total_excise_duty"
  | "total_communications_tax"
  | "total_vat"
  | "total_vat_withholding"
  | "total_discount"
  | "total_invoice_discount"
  | "remaining"
  | "remaining_in_trl"
  | "payment_status"
  | "sharings_count"
  | "e_invoices_count"
  | "remaining_reimbursement"
  | "remaining_reimbursement_in_trl"
  | "created_at"
  | "updated_at"
>;

export type PurchaseBillRequestRels = {
  category?: RequestRelationship<"item_categories">;
  tags?: RequestRelationship<"tags", true>;
  paid_by_employee?: RequestRelationship<"employees">;
  supplier?: RequestRelationship<"contacts">;
};

export type PurchaseBillRequestResource = RequestResource<
  "purchase_bills",
  PurchaseBillRequestAttributes,
  PurchaseBillRequestRels
>;

export type PurchaseBillResponseRels = {
  category?: ResponseRelationship<"item_categories">;
  spender?: ResponseRelationship<"employees">;
  details?: ResponseRelationship<"purchase_bill_details", true>;
  payments?: ResponseRelationship<"payments", true>;
  tags?: ResponseRelationship<"tags", true>;
  recurrence_plan?: ResponseRelationship<"recurrence_plans">;
  active_e_document?: ResponseRelationship<"e_archives" | "e_invoices">;
  pay_to?: ResponseRelationship<"contacts" | "employees">;
};

export type PurchaseBillResponseResource = ResponseResource<
  "purchase_bills",
  PurchaseBillResponseAttributes,
  PurchaseBillResponseRels
>;

type PurchaseBillResponseRelInc =
  ResponseIncludedFrom<PurchaseBillResponseResource>;

export type PurchaseBillResponseIncluded =
  PromoteResponseIdentifiers<PurchaseBillResponseRelInc>;
