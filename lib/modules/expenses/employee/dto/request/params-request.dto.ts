import {
  BasePaginationParams,
  BasePaginationParamsType,
} from "../../../../../dto/request";

export type EmployeePaginationParamsType = BasePaginationParamsType<
  "balance" | "name" | "email",
  "employees"
>;

export class EmployeePaginationParams extends BasePaginationParams<
  "balance" | "name" | "email",
  "employees"
> {
  constructor(dto?: EmployeePaginationParamsType) {
    super(dto);
  }
}
