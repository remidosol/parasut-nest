import { BaseResponse } from "../../../../../dto/response";
import {
  Currency,
  PurchaseBillItemType,
} from "../../../../../types/common.enums";

export type PurchaseBillAttributes = {
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
  item_type: PurchaseBillItemType;
  description?: string;
  issue_date: Date;
  due_date: Date;
  invoice_no?: string;
  currency: Currency;
  exchange_rate?: number;
  net_total: number;
  withholding_rate?: number;
  invoice_discount_type?: string;
  invoice_discount?: number;
};

export class PurchaseBillResponse extends BaseResponse<
  PurchaseBillAttributes,
  "purchase_bills"
> {}
