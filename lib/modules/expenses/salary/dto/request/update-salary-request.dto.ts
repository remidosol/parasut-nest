import { SingleRequest } from "../../../../../dto/request";
import { SalaryRequestResource } from "../salary.attr";

export type UpdateSalaryRequest = Partial<SingleRequest<SalaryRequestResource>>;
