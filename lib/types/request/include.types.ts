import { EntityType } from "../common.types";

export type RequestIncludeByType<
  T extends EntityType,
  EndpointType extends "index" | "detail" = "index",
> = T extends "sales_offers"
  ? EndpointType extends "index"
    ? ("sales_invoice" | "contact")[]
    : "product"[]
  : T extends "sales_invoices"
    ? (
        | "category"
        | "contact"
        | "details"
        | "details.product"
        | "details.warehouse"
        | "payments"
        | "payments.transaction"
        | "tags"
        | "sharings"
        | "recurrence_plan"
        | "active_e_document"
      )[]
    : T extends "sharings"
      ? ["collaborator.contact_portal.accounts"]
      : T extends "contacts"
        ? ("category" | "contact_portal" | "contact_people")[]
        : T extends "purchase_bills"
          ? (
              | "category"
              | "spender"
              | "details"
              | "details.product"
              | "details.warehouse"
              | "payments"
              | "payments.transaction"
              | "tags"
              | "recurrence_plan"
              | "active_e_document"
              | "pay_to"
            )[]
          : T extends "bank_fees"
            ? ("category" | "tags")[]
            : T extends "salaries"
              ? EndpointType extends "index"
                ? (
                    | "category"
                    | "tags"
                    | "payments"
                    | "activities"
                    | "employee"
                  )[]
                : ("employee" | "category" | "tags")[]
              : T extends "employees"
                ? ("category" | "managed_by_user" | "managed_by_user_role")[]
                : T extends "transactions"
                  ? ("debit_account" | "credit_account" | "payments")[]
                  : T extends "products"
                    ? ("inventory_levels" | "category")[]
                    : T extends "warehouses"
                      ? "inventory_levels"[]
                      : T extends "shipment_documents"
                        ? (
                            | "contact"
                            | "tags"
                            | "stock_movements"
                            | "stock_movements.product"
                            | "invoices"
                          )[]
                        : T extends "inventory_levels"
                          ? ("warehouse" | "product")[]
                          : T extends "item_categories"
                            ? ("parent_category" | "subcategories")[]
                            : T extends "users"
                              ? ("user_roles" | "companies" | "profile")[]
                              : never;
