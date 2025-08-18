import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";

export type ESmmAttributes = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
};

export type ESmmResponseRels = {
  sales_invoice?: ResponseRelationship<"sales_invoices">;
};

export type ESmmRequestResource = RequestResource<"e_smms", any>;

export type ESmmResponseResource = ResponseResource<
  "e_smms",
  ESmmAttributes,
  ESmmResponseRels
>;

type ESmmResponseRelInc = ResponseIncludedFrom<ESmmResponseResource>;

export type ESmmResponseIncluded =
  PromoteResponseIdentifiers<ESmmResponseRelInc>;
