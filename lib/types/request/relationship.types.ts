import { EntityType } from "../common.types";

export type RequestRelationshipsData<
  T extends EntityType,
  ReqAttr = any,
  ReqRel = any,
> = {
  data: {
    id?: string;
    type: T;
    attributes?: ReqAttr;
    relationships?: ReqRel;
  };
};

export type ReqRelData<
  T extends EntityType,
  isArray extends boolean = false,
  ReqAttr = any,
  ReqRel = any,
> = isArray extends true
  ? RequestRelationshipsData<T, ReqAttr, ReqRel>[]
  : RequestRelationshipsData<T, ReqAttr, ReqRel>;

export type RequestRelationships<ReqAttr = any, ReqRel = any> = {
  sales_invoice?: ReqRelData<"sales_invoices", false, ReqAttr, ReqRel>;
  category?: ReqRelData<"item_categories", false, ReqAttr, ReqRel>;
  parent_category?: ReqRelData<"item_categories", false, ReqAttr, ReqRel>;
  subcategories?: ReqRelData<"item_categories", true, ReqAttr, ReqRel>;
  contact?: ReqRelData<"contacts", false, ReqAttr, ReqRel>;
  details?: ReqRelData<
    | "sales_offer_details"
    | "sales_invoice_details"
    | "purchase_bill_details"
    | "stock_update_details",
    true,
    ReqAttr,
    ReqRel
  >;
  activities?: ReqRelData<"activities", true, ReqAttr, ReqRel>;
  sharings?: ReqRelData<"sharings", true, ReqAttr, ReqRel>;
  managed_by_user?: ReqRelData<"users", false, ReqAttr, ReqRel>;
  managed_by_user_role?: ReqRelData<"user_roles", false, ReqAttr, ReqRel>;
  user_roles?: ReqRelData<"user_roles", true, ReqAttr, ReqRel>;
  company?: ReqRelData<"companies", true, ReqAttr, ReqRel>;
  tags?: ReqRelData<"tags", true, ReqAttr, ReqRel>;
  sales_offer?: ReqRelData<"sales_offers", false, ReqAttr, ReqRel>;
  recurrence_plan?: ReqRelData<"recurrence_plans", false, ReqAttr, ReqRel>;
  active_e_document?: ReqRelData<
    "e_archives" | "e_invoices",
    false,
    ReqAttr,
    ReqRel
  >;
  profile?: ReqRelData<"profiles", false, ReqAttr, ReqRel>;
  contact_portal?: ReqRelData<"contact_portals", false, ReqAttr, ReqRel>;
  contact_people?: ReqRelData<"contact_people", true, ReqAttr, ReqRel>;
  payments?: ReqRelData<"payments", true, ReqAttr, ReqRel>;
  debit_account?: ReqRelData<"accounts", false, ReqAttr, ReqRel>;
  credit_account?: ReqRelData<"accounts", false, ReqAttr, ReqRel>;
  employee?: ReqRelData<"employees", false, ReqAttr, ReqRel>;
  spender?: ReqRelData<"employees", false, ReqAttr, ReqRel>;
  supplier?: ReqRelData<"contacts", false, ReqAttr, ReqRel>;
  paid_by_employee?: ReqRelData<"employees", false, ReqAttr, ReqRel>;
  pay_to?: ReqRelData<"contacts" | "employees", false, ReqAttr, ReqRel>;
  inventory_levels?: ReqRelData<"inventory_levels", false, ReqAttr, ReqRel>;
  payable?: ReqRelData<
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
  transaction?: ReqRelData<"transactions", false, ReqAttr, ReqRel>;
  warehouse?: ReqRelData<"warehouses", false, ReqAttr, ReqRel>;
  product?: ReqRelData<"products", false, ReqAttr, ReqRel>;
  source?: ReqRelData<
    "shipment_documents" | "sales_invoice_details" | "purchase_bill_details",
    false,
    ReqAttr,
    ReqRel
  >;
  stock_movements?: ReqRelData<"stock_movements", true, ReqAttr, ReqRel>;
  invoices?: ReqRelData<
    "sales_invoices" | "purchase_bills",
    true,
    ReqAttr,
    ReqRel
  >;
};

export type RequestRelationshipsByType<
  T extends EntityType,
  ReqAttr = any,
  ReqRel = any,
> = T extends "sales_offers"
  ? Pick<RequestRelationships<ReqAttr, ReqRel>, "contact" | "details">
  : T extends "sales_invoices"
    ? Pick<
        RequestRelationships,
        "category" | "contact" | "details" | "tags" | "sales_offer"
      >
    : T extends "contacts"
      ? Pick<
          RequestRelationships<ReqAttr, ReqRel>,
          "category" | "contact_people"
        >
      : T extends "purchase_bills"
        ? Pick<
            RequestRelationships,
            "category" | "tags" | "paid_by_employee" | "supplier"
          >
        : T extends "bank_fees"
          ? Pick<RequestRelationships<ReqAttr, ReqRel>, "category" | "tags">
          : T extends "salaries"
            ? Pick<
                RequestRelationships<ReqAttr, ReqRel>,
                "employee" | "category" | "tags"
              >
            : T extends "employees"
              ? Pick<RequestRelationships<ReqAttr, ReqRel>, "category">
              : T extends "products"
                ? Pick<
                    RequestRelationships<ReqAttr, ReqRel>,
                    "inventory_levels" | "category"
                  >
                : T extends "warehouses"
                  ? Pick<
                      RequestRelationships<ReqAttr, ReqRel>,
                      "inventory_levels"
                    >
                  : T extends "shipment_documents"
                    ? Pick<
                        RequestRelationships,
                        "contact" | "tags" | "stock_movements"
                      >
                    : never;
