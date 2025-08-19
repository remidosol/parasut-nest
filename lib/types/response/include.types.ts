import { EntityType } from "../common.types";
import { ResponseIncluded } from "./base-response.types";

export type ResponseIncludeByType<
  T extends EntityType,
  EndpointType extends "index" | "show" | "detail",
> = T extends "sales_offers"
  ? EndpointType extends "index"
    ? ResponseIncluded<"contacts" | "sales_invoices">[]
    : EndpointType extends "detail"
      ? ResponseIncluded<"products">[]
      : ResponseIncluded<
          "contacts" | "sales_invoices" | "details" | "activities" | "sharings"
        >[]
  : T extends "sales_invoices"
    ? EndpointType extends "index" | "show"
      ? ResponseIncluded<
          | "item_categories"
          | "contacts"
          | "sales_invoice_details"
          | "payments"
          | "tags"
          | "sales_offers"
          | "sharings"
          | "recurrence_plans"
          | "e_archives"
          | "e_invoices"
        >[]
      : never
    : T extends "contacts"
      ? EndpointType extends "index" | "show"
        ? ResponseIncluded<
            "item_categories" | "contact_portals" | "contact_people"
          >[]
        : never
      : T extends "purchase_bills"
        ? EndpointType extends "index" | "show"
          ? ResponseIncluded<
              | "item_categories"
              | "employees"
              | "contacts"
              | "purchase_bill_details"
              | "payments"
              | "tags"
              | "recurrence_plans"
              | "e_invoices"
            >[]
          : never
        : T extends "bank_fees"
          ? EndpointType extends "show"
            ? ResponseIncluded<"item_categories" | "tags">[]
            : never
          : T extends "salaries"
            ? EndpointType extends "index" | "show"
              ? ResponseIncluded<"employees" | "tags" | "item_categories">[]
              : never
            : T extends "employees"
              ? EndpointType extends "index" | "show"
                ? ResponseIncluded<"item_categories" | "users" | "user_roles">[]
                : never
              : T extends "transactions"
                ? ResponseIncluded<"accounts" | "payments">[]
                : T extends "products"
                  ? EndpointType extends "index" | "show"
                    ? ResponseIncluded<"inventory_levels" | "item_categories">[]
                    : never
                  : T extends "warehouses"
                    ? EndpointType extends "index" | "show"
                      ? ResponseIncluded<"inventory_levels">[]
                      : never
                    : T extends "shipment_documents"
                      ? EndpointType extends "index" | "show"
                        ? ResponseIncluded<
                            | "contacts"
                            | "tags"
                            | "stock_movements"
                            | "sales_invoices"
                            | "purchase_bills"
                          >[]
                        : never
                      : T extends "inventory_levels"
                        ? EndpointType extends "index"
                          ? ResponseIncluded<
                              | "warehouses"
                              | "products"
                              | "shipment_documents"
                              | "sales_invoice_details"
                              | "purchase_bill_details"
                              | "contacts"
                            >[]
                          : never
                        : T extends "item_categories"
                          ? EndpointType extends "index" | "show"
                            ? ResponseIncluded<"item_categories">[]
                            : never
                          : T extends "users"
                            ? EndpointType extends "show"
                              ? ResponseIncluded<
                                  "user_roles" | "companies" | "profiles"
                                >[]
                              : never
                            : never;
