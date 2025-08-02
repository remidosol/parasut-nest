export type SalesInvoiceAttributes = {
  archived?: boolean;
  invoice_no?: string;
  net_total?: number;
  gross_total?: number;
  withholding?: number;
  total_excise_duty?: number;
  total_communications_tax?: number;
  total_vat?: number;
  total_vat_withholding?: number;
  total_discount?: number;
  total_invoice_discount?: number;
  before_taxes_total?: number;
  remaining?: number;
  remaining_in_trl?: number;
  payment_status?: "paid" | "overdue" | "unpaid" | "partially_paid";
  created_at?: Date;
  updated_at?: Date;
  item_type?:
    | "invoice"
    | "export"
    | "estimate"
    | "cancelled"
    | "recurring_invoice"
    | "recurring_estimate"
    | "recurring_export"
    | "refund";
  description?: string;
  issue_date: Date;
  due_date?: Date;
  invoice_series?: string;
  invoice_id?: number;
  currency?: "TRL" | "USD" | "EUR" | "GBP";
  exchange_rate?: number;
  withholding_rate?: number;
  invoice_discount_type?: "percentage" | "amount";
  invoice_discount?: number;
  billing_address?: string;
  billing_postal_code?: string;
  billing_phone?: string;
  billing_fax?: string;
  tax_office?: string;
  tax_number?: string;
  country?: string;
  city?: string;
  district?: string;
  is_abroad?: boolean;
  order_no?: string;
  order_date?: Date;
  shipment_addres?: string;
  shipment_included?: boolean;
  cash_sale?: boolean;
  payer_tax_numbers?: string[];
  invoice_note?: string;
  append_contact_balance?: boolean;
  e_document_accounts?: null[];
};

// export type SalesInvoiceResponse = BaseResponse<
//   SalesInvoiceAttributes,
//   "sales_invoices"
// >;
