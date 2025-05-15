export enum AccountType {
  CUSTOMER = "customer",
  SUPPLIER = "supplier",
}

export enum Currency {
  TRL = "TRL",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum PurchaseBillItemType {
  PURCHASE_BILL = "purchase_bill",
  CANCELLED = "cancelled",
  RECURRING_PURCHASE_BILL = "recurring_purchase_bill",
  REFUND = "refund",
}

export enum SalesInvoiceItemType {
  INVOICE = "invoice",
  EXPORT = "export",
  ESTIMATE = "estimate",
  CANCELLED = "cancelled",
  RECURRING_INVOICE = "recurring_invoice",
  RECURRING_ESTIMATE = "recurring_estimate",
  RECURRING_EXPORT = "recurring_export",
  REFUND = "refund",
}

export enum PaymentStatus {
  PAID = "paid",
  OVERDUE = "overdue",
  UNPAID = "unpaid",
  PARTIALLY_PAID = "partially_paid",
}

export enum InvoiceDiscountType {
  PERCENTAGE = "percentage",
  AMOUNT = "amount",
}
