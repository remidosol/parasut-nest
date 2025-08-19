import {
  PromoteResponseIdentifiers,
  RequestRelationship,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../../types";

export type TaxAttributes = {
  total_paid?: number;
  archived?: boolean;
  remaining?: number;
  remaining_in_trl?: number;
  created_at?: Date;
  updated_at?: Date;
  description: string;
  issue_date: Date;
  due_date: Date;
  net_total: number;
};

export type TaxRequestAttributes = Exclude<
  TaxAttributes,
  | "total_paid"
  | "archived"
  | "remaining"
  | "remaining_in_trl"
  | "created_at"
  | "updated_at"
>;

export type TaxRequestRels = {
  category?: RequestRelationship<"item_categories">;
  tags?: RequestRelationship<"tags", true>;
};

export type TaxRequestResource = RequestResource<
  "taxes",
  TaxRequestAttributes,
  TaxRequestRels
>;

export type TaxResponseRels = {
  category?: ResponseRelationship<"item_categories">;
  tags?: ResponseRelationship<"tags", true>;
  payments?: ResponseRelationship<"payments", true>;
};

export type TaxResponseResource = ResponseResource<
  "taxes",
  TaxAttributes,
  TaxResponseRels
>;

type TaxResponseRelInc = ResponseIncludedFrom<TaxResponseResource>;

export type TaxResponseIncluded = PromoteResponseIdentifiers<TaxResponseRelInc>;
