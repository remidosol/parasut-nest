import { SingleRequest } from "../../../../../dto/request";
import { EmployeeRequestResource } from "../employee.attr";

export type UpdateEmployeeRequest = Partial<
  SingleRequest<EmployeeRequestResource>
>;
