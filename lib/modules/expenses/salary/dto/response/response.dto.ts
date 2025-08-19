import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import { SalaryResponseIncluded, SalaryResponseResource } from "../salary.attr";

export type CreateSalaryResponse = SingleResponse<
  SalaryResponseResource,
  SalaryResponseIncluded[]
>;

export type GetSalaryResponse = SingleResponse<
  SalaryResponseResource,
  SalaryResponseIncluded[]
>;

export type UpdateSalaryResponse = SingleResponse<
  SalaryResponseResource,
  SalaryResponseIncluded[]
>;

export type IndexSalaryResponse = CollectionResponse<
  SalaryResponseResource,
  SalaryResponseIncluded[]
>;
