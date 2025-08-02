import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import {
  EmployeeResponseIncluded,
  EmployeeResponseResource,
} from "../employee.attr";

export type CreateEmployeeResponse = SingleResponse<
  EmployeeResponseResource,
  EmployeeResponseIncluded[]
>;

export type GetEmployeeResponse = SingleResponse<
  EmployeeResponseResource,
  EmployeeResponseIncluded[]
>;

export type UpdateEmployeeResponse = SingleResponse<
  EmployeeResponseResource,
  EmployeeResponseIncluded[]
>;

export type IndexEmployeeResponse = CollectionResponse<
  EmployeeResponseResource,
  EmployeeResponseIncluded[]
>;
