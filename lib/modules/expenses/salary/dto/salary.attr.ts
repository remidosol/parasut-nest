import {
  PromoteResponseIdentifiers,
  RequestRelationship,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../../types";

export type SalaryAttributes = {
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

export type SalaryRequestAttributes = Exclude<
  SalaryAttributes,
  | "total_paid"
  | "archived"
  | "remaining"
  | "remaining_in_trl"
  | "created_at"
  | "updated_at"
>;

export type SalaryRequestRels = {
  employee?: RequestRelationship<"employees">;
  category?: RequestRelationship<"item_categories">;
  tags?: RequestRelationship<"tags", true>;
};

export type SalaryRequestResource = RequestResource<
  "salaries",
  SalaryRequestAttributes,
  SalaryRequestRels
>;

export type SalaryResponseRels = {
  employee?: ResponseRelationship<"employees">;
  category?: ResponseRelationship<"item_categories">;
  tags?: ResponseRelationship<"tags", true>;
  payments?: ResponseRelationship<"payments", true>;
};

export type SalaryResponseResource = ResponseResource<
  "salaries",
  SalaryAttributes,
  SalaryResponseRels
>;

type SalaryResponseRelInc = ResponseIncludedFrom<SalaryResponseResource>;

export type SalaryResponseIncluded =
  PromoteResponseIdentifiers<SalaryResponseRelInc>;
