import { BaseResponse } from "../../../../../dto/response";

export type EmployeeAttributes = {
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

export class EmployeeResponse extends BaseResponse<
  EmployeeAttributes,
  "employees"
> {}
