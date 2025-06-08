import {
  PromoteResponseIdentifiers,
  RequestNestedFrom,
  RequestRelationship,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";
import { PromoteRequestIdentifiers } from "../../../types/request/request-resource.types";

export type InvoicingPreferences = {
  e_document_accounts?: number[];
};

export type ContactResponseAttributes = {
  account_type: "customer" | "supplier";
  name: string;
  balance?: number;
  trl_balance?: number;
  usd_balance?: number;
  eur_balance?: number;
  gbp_balance?: number;
  created_at?: Date;
  updated_at?: Date;
  email?: string;
  short_name?: string;
  contact_type?: "person" | "company";
  tax_office?: string;
  tax_number?: string;
  district?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  address?: string;
  phone?: string;
  fax?: string;
  is_abroad?: boolean;
  archived?: boolean;
  iban?: string;
  untrackable?: boolean;
  invoicing_preferences?: InvoicingPreferences;
};

export type ContactRequestAttributes = Exclude<
  ContactResponseAttributes,
  | "balance"
  | "trl_balance"
  | "usd_balance"
  | "eur_balance"
  | "gbp_balance"
  | "created_at"
  | "updated_at"
>;

export type ContactPersonAttributes = {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
};

export type CategoryAttributes = {};

export type ContactResponseRels = {
  category: ResponseRelationship<"item_categories">;
  contact_portal: ResponseRelationship<"contact_portals">;
  contact_people: ResponseRelationship<"contact_people", true>;
};

export type ContactRequestRels = {
  category?: RequestRelationship<"item_categories">;
  contact_people?: RequestRelationship<
    "contact_people",
    true,
    ContactPersonAttributes
  >;
};

export type ContactRequestNested = RequestNestedFrom<ContactRequestResource>;
export type ContactRequestPromotedInc =
  PromoteRequestIdentifiers<ContactRequestNested>;

export type ContactRequestResource = RequestResource<
  "contacts",
  ContactRequestAttributes,
  ContactRequestRels
>;

export type ContactPersonRequestResource = RequestResource<
  "contact_people",
  ContactPersonAttributes
>;

export type CategoryRequestResource = RequestResource<
  "item_categories",
  CategoryAttributes
>;

export type ContactResponseResource = ResponseResource<
  "contacts",
  ContactResponseAttributes,
  ContactResponseRels
>;

type ContactResponseRelInc = ResponseIncludedFrom<ContactResponseResource>;

export type ContactResponseIncluded =
  PromoteResponseIdentifiers<ContactResponseRelInc>;
