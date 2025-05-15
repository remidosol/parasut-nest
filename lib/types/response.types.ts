export type ResponseType =
  | "contacts"
  | "sales_invoices"
  | "purchase_bills"
  | "taxes"
  | "bank_fees"
  | "salaries"
  | "checks"
  | "transactions"
  | "sales_offer_details"
  | "sales_invoice_details"
  | "details"
  | "activities"
  | "sharings"
  | "users"
  | "user_roles"
  | "companies"
  | "payments"
  | "accounts"
  | "tags"
  | "sales_offers"
  | "recurrence_plans"
  | "item_categories"
  | "e_archives"
  | "e_invoices"
  | "contact_portals"
  | "contact_people"
  | "employees"
  | "purchase_bill_details"
  | "inventory_levels"
  | "stock_movements"
  | "warehouses"
  | "products"
  | "shipment_documents"
  | "stock_update_details"
  | "profiles";

export type ResponseRelationshipsData<
  T extends ResponseType,
  isArray extends boolean = false,
> = {
  data: isArray extends true
    ? {
        id: string;
        type: T;
      }[]
    : {
        id: string;
        type: T;
      };
};

export type ResponseRelationships = {
  sales_invoice?: ResponseRelationshipsData<"sales_invoices">;
  category?: ResponseRelationshipsData<"item_categories">;
  parent_category?: ResponseRelationshipsData<"item_categories">;
  subcategories?: ResponseRelationshipsData<"item_categories", true>;
  contact?: ResponseRelationshipsData<"contacts">;
  details?: ResponseRelationshipsData<
    | "sales_offer_details"
    | "sales_invoice_details"
    | "purchase_bill_details"
    | "stock_update_details",
    true
  >;
  activities?: ResponseRelationshipsData<"activities", true>;
  sharings?: ResponseRelationshipsData<"sharings", true>;
  managed_by_user?: ResponseRelationshipsData<"users">;
  managed_by_user_role?: ResponseRelationshipsData<"user_roles">;
  user_roles?: ResponseRelationshipsData<"user_roles", true>;
  company?: ResponseRelationshipsData<"companies", true>;
  tags?: ResponseRelationshipsData<"tags", true>;
  sales_offer?: ResponseRelationshipsData<"sales_offers">;
  recurrence_plan?: ResponseRelationshipsData<"recurrence_plans">;
  active_e_document?: ResponseRelationshipsData<"e_archives" | "e_invoices">;
  profile?: ResponseRelationshipsData<"profiles">;
  contact_portal?: ResponseRelationshipsData<"contact_portals">;
  contact_people?: ResponseRelationshipsData<"contact_people", true>;
  payments?: ResponseRelationshipsData<"payments", true>;
  debit_account?: ResponseRelationshipsData<"accounts">;
  credit_account?: ResponseRelationshipsData<"accounts">;
  employee?: ResponseRelationshipsData<"employees">;
  spender?: ResponseRelationshipsData<"employees">;
  supplier?: ResponseRelationshipsData<"contacts">;
  pay_to?: ResponseRelationshipsData<"contacts" | "employees">;
  inventory_levels?: ResponseRelationshipsData<"inventory_levels">;
  payable?: ResponseRelationshipsData<
    | "sales_invoices"
    | "purchase_bills"
    | "taxes"
    | "bank_fees"
    | "salaries"
    | "checks"
  >;
  transaction?: ResponseRelationshipsData<"transactions">;
  warehouse?: ResponseRelationshipsData<"warehouses">;
  product?: ResponseRelationshipsData<"products">;
  source?: ResponseRelationshipsData<
    "shipment_documents" | "sales_invoice_details" | "purchase_bill_details"
  >;
  stock_movements?: ResponseRelationshipsData<"stock_movements", true>;
  invoices?: ResponseRelationshipsData<
    "sales_invoices" | "purchase_bills",
    true
  >;
};

export type Included = {
  id?: string;
  type?: ResponseType;
  attributes?: any;
  relationships?: any;
};

export type Links = {
  self?: string | null;
  first?: string | null;
  prev?: string | null;
  next?: string | null;
  last?: string | null;
};

export type Meta = {
  current_page?: number;
  total_pages?: number;
  total_count?: number;
  created_at?: Date;
  updated_at?: Date;
};

export type ResponseRelationshipsByType<T extends ResponseType> =
  T extends "sales_offers"
    ? Pick<
        ResponseRelationships,
        "sales_invoice" | "contact" | "details" | "activities" | "sharings"
      >
    : T extends "sales_offers_details"
      ? Pick<ResponseRelationships, "product">
      : T extends "sales_invoices"
        ? Pick<
            ResponseRelationships,
            | "category"
            | "contact"
            | "details"
            | "payments"
            | "tags"
            | "sales_offer"
            | "sharings"
            | "recurrence_plan"
            | "active_e_document"
          >
        : T extends "contacts"
          ? Pick<
              ResponseRelationships,
              "category" | "contact_portal" | "contact_people"
            >
          : T extends "purchase_bills"
            ? Pick<
                ResponseRelationships,
                | "category"
                | "spender"
                | "supplier"
                | "details"
                | "payments"
                | "tags"
                | "recurrence_plan"
                | "active_e_document"
                | "pay_to"
              >
            : T extends "bank_fees"
              ? Pick<ResponseRelationships, "category" | "tags">
              : T extends "salaries"
                ? Pick<ResponseRelationships, "employee" | "category" | "tags">
                : T extends "employees"
                  ? Pick<
                      ResponseRelationships,
                      "category" | "managed_by_user" | "managed_by_user_role"
                    >
                  : T extends "accounts"
                    ? any
                    : T extends "transactions"
                      ? Pick<
                          ResponseRelationships,
                          "debit_account" | "credit_account" | "payments"
                        >
                      : T extends "products"
                        ? Pick<
                            ResponseRelationships,
                            "inventory_levels" | "category"
                          >
                        : T extends "warehouses"
                          ? Pick<ResponseRelationships, "inventory_levels">
                          : T extends "shipment_documents"
                            ? Pick<
                                ResponseRelationships,
                                | "contact"
                                | "tags"
                                | "stock_movements"
                                | "invoices"
                              >
                            : T extends "stock_movements"
                              ? Pick<
                                  ResponseRelationships,
                                  "warehouse" | "product" | "source" | "contact"
                                >
                              : T extends "inventory_levels"
                                ? Pick<
                                    ResponseRelationships,
                                    "warehouse" | "product"
                                  >
                                : T extends "item_categories"
                                  ? Pick<
                                      ResponseRelationships,
                                      "parent_category" | "subcategories"
                                    >
                                  : T extends "tags"
                                    ? any
                                    : T extends "users"
                                      ? Pick<
                                          ResponseRelationships,
                                          "user_roles" | "company" | "profile"
                                        >
                                      : never;

export type BaseResponseData<Attrs, Type extends ResponseType> = {
  id?: string;
  type?: Type;
  attributes: Attrs;
  relationships?: ResponseRelationshipsByType<Type>;
  links?: Links;
  meta?: Meta;
};
