import {
  PromoteResponseIdentifiers,
  RequestNestedFrom,
  RequestRelationship,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../../types";
import { PromoteRequestIdentifiers } from "../../../../types/request/request-resource.types";

export type BankFeeRequestAttributes = {
  description: string;
  currency: "TRL" | "USD" | "EUR" | "GBP";
  issue_date: Date;
  due_date: Date;
  exchange_rate?: number;
  net_total: number;
};

export type BankFeeRequestRels = {
  category?: RequestRelationship<"item_categories">;
  tags?: RequestRelationship<"tags", true>;
};

export type BankFeeRequestResource = RequestResource<
  "bank_fees",
  BankFeeRequestAttributes,
  BankFeeRequestRels
>;

export type BankFeeRequestNested = RequestNestedFrom<BankFeeRequestResource>;
export type BankFeeRequestPromotedInc =
  PromoteRequestIdentifiers<BankFeeRequestNested>;

export type CategoryRequestResource = RequestResource<"item_categories", {}>;

export type BankFeeResponseAttributes = {
  total_paid?: number;
  archived?: boolean;
  remaining?: number;
  remaining_in_trl?: number;
  created_at?: Date;
  updated_at?: Date;
  description: string;
  currency: "TRL" | "USD" | "EUR" | "GBP";
  issue_date: Date;
  due_date: Date;
  exchange_rate?: number;
  net_total: number;
};

export type BankFeeResponseRels = {
  category?: ResponseRelationship<"item_categories">;
  tags?: ResponseRelationship<"tags", true>;
};

export type BankFeeResponseResource = ResponseResource<
  "bank_fees",
  BankFeeResponseAttributes,
  BankFeeResponseRels
>;

type BankFeeResponseRelInc = ResponseIncludedFrom<BankFeeResponseResource>;

export type BankFeeResponseIncluded =
  PromoteResponseIdentifiers<BankFeeResponseRelInc>;
