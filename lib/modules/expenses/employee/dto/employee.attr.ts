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

export type EmployeeRequestAttributes = {
  name: string;
  email?: string;
  archived?: boolean;
  iban?: string;
};

export type EmployeeRequestRels = {
  category?: RequestRelationship<"item_categories">;
};

export type EmployeeRequestResource = RequestResource<
  "employees",
  EmployeeRequestAttributes,
  EmployeeRequestRels
>;

export type EmployeeRequestNested = RequestNestedFrom<EmployeeRequestResource>;
export type EmployeeRequestPromotedInc =
  PromoteRequestIdentifiers<EmployeeRequestNested>;

export type EmployeeResponseAttributes = {
  balance?: number;
  trl_balance?: number;
  usd_balance?: number;
  eur_balance?: number;
  gbp_balance?: number;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  email?: string;
  archived?: boolean;
  iban?: string;
};

export type EmployeeResponseRels = {
  category?: ResponseRelationship<"item_categories">;
  managed_by_user?: ResponseRelationship<"users">;
  managed_by_user_role?: ResponseRelationship<"user_roles">;
};

export type EmployeeResponseResource = ResponseResource<
  "employees",
  EmployeeResponseAttributes,
  EmployeeResponseRels
>;

type EmployeeResponseRelInc = ResponseIncludedFrom<EmployeeResponseResource>;

export type EmployeeResponseIncluded =
  PromoteResponseIdentifiers<EmployeeResponseRelInc>;
