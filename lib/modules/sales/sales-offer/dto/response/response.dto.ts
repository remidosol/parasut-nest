import { BaseResponse } from "../../../../../dto/response";
import {
  Currency,
  InvoiceDiscountType,
} from "../../../../../types/common.enums";

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
  currency?: Currency;
  exchange_rate?: number;
  withholding_rate?: number;
  invoice_discount_type?: InvoiceDiscountType;
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

export class SalesOfferResponse extends BaseResponse<
  SalesOfferAttributes,
  "sales_offers"
> {}
