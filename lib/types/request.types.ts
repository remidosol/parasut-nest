export type RequestRelationshipsData<
  T extends string,
  isArray extends boolean = false,
  ReqAttr = any,
  ReqRel = any,
> = {
  data: isArray extends true
    ? {
        id?: string;
        type: T;
        attributes?: ReqAttr;
        relationships?: ReqRel;
      }[]
    : {
        id?: string;
        type: T;
        attributes?: ReqAttr;
        relationships?: ReqRel;
      };
};

export type RequestRelationships<ReqAttr = any, ReqRel = any> = {
  sales_invoice?: RequestRelationshipsData<
    "sales_invoices",
    false,
    ReqAttr,
    ReqRel
  >;
  category?: RequestRelationshipsData<
    "item_categories",
    false,
    ReqAttr,
    ReqRel
  >;
  parent_category?: RequestRelationshipsData<
    "item_categories",
    false,
    ReqAttr,
    ReqRel
  >;
  subcategories?: RequestRelationshipsData<
    "item_categories",
    true,
    ReqAttr,
    ReqRel
  >;
  contact?: RequestRelationshipsData<"contacts", false, ReqAttr, ReqRel>;
  details?: RequestRelationshipsData<
    | "sales_offer_details"
    | "sales_invoice_details"
    | "purchase_bill_details"
    | "stock_update_details",
    true,
    ReqAttr,
    ReqRel
  >;
  activities?: RequestRelationshipsData<"activities", true, ReqAttr, ReqRel>;
  sharings?: RequestRelationshipsData<"sharings", true, ReqAttr, ReqRel>;
  managed_by_user?: RequestRelationshipsData<"users", false, ReqAttr, ReqRel>;
  managed_by_user_role?: RequestRelationshipsData<
    "user_roles",
    false,
    ReqAttr,
    ReqRel
  >;
  user_roles?: RequestRelationshipsData<"user_roles", true, ReqAttr, ReqRel>;
  company?: RequestRelationshipsData<"companies", true, ReqAttr, ReqRel>;
  tags?: RequestRelationshipsData<"tags", true, ReqAttr, ReqRel>;
  sales_offer?: RequestRelationshipsData<
    "sales_offers",
    false,
    ReqAttr,
    ReqRel
  >;
  recurrence_plan?: RequestRelationshipsData<
    "recurrence_plans",
    false,
    ReqAttr,
    ReqRel
  >;
  active_e_document?: RequestRelationshipsData<
    "e_archives" | "e_invoices",
    false,
    ReqAttr,
    ReqRel
  >;
  profile?: RequestRelationshipsData<"profiles", false, ReqAttr, ReqRel>;
  contact_portal?: RequestRelationshipsData<
    "contact_portals",
    false,
    ReqAttr,
    ReqRel
  >;
  contact_people?: RequestRelationshipsData<
    "contact_people",
    true,
    ReqAttr,
    ReqRel
  >;
  payments?: RequestRelationshipsData<"payments", true, ReqAttr, ReqRel>;
  debit_account?: RequestRelationshipsData<"accounts", false, ReqAttr, ReqRel>;
  credit_account?: RequestRelationshipsData<"accounts", false, ReqAttr, ReqRel>;
  employee?: RequestRelationshipsData<"employees", false, ReqAttr, ReqRel>;
  spender?: RequestRelationshipsData<"employees", false, ReqAttr, ReqRel>;
  supplier?: RequestRelationshipsData<"contacts", false, ReqAttr, ReqRel>;
  pay_to?: RequestRelationshipsData<
    "contacts" | "employees",
    false,
    ReqAttr,
    ReqRel
  >;
  inventory_levels?: RequestRelationshipsData<
    "inventory_levels",
    false,
    ReqAttr,
    ReqRel
  >;
  payable?: RequestRelationshipsData<
    | "sales_invoices"
    | "purchase_bills"
    | "taxes"
    | "bank_fees"
    | "salaries"
    | "checks",
    false,
    ReqAttr,
    ReqRel
  >;
  transaction?: RequestRelationshipsData<
    "transactions",
    false,
    ReqAttr,
    ReqRel
  >;
  warehouse?: RequestRelationshipsData<"warehouses", false, ReqAttr, ReqRel>;
  product?: RequestRelationshipsData<"products", false, ReqAttr, ReqRel>;
  source?: RequestRelationshipsData<
    "shipment_documents" | "sales_invoice_details" | "purchase_bill_details",
    false,
    ReqAttr,
    ReqRel
  >;
  stock_movements?: RequestRelationshipsData<
    "stock_movements",
    true,
    ReqAttr,
    ReqRel
  >;
  invoices?: RequestRelationshipsData<
    "sales_invoices" | "purchase_bills",
    true,
    ReqAttr,
    ReqRel
  >;
};

export type BaseRequestData<T, ReqAttr = any, ReqRel = any> = {
  id?: string;
  type?: ResponseType;
  attributes?: T;
  relationships?: RequestRelationships<ReqAttr, ReqRel>;
};
