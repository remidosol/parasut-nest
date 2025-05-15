import { BaseResponse } from "../../../../../dto/response";
import { Currency } from "../../../../../types/common.enums";

export type BankFeeAttributes = {
  total_paid?: number;
  archived?: boolean;
  remaining?: number;
  remaining_in_trl?: number;
  created_at?: Date;
  updated_at?: Date;
  description: string;
  currency: Currency;
  issue_date: Date;
  due_date: Date;
  exchange_rate?: number;
  net_total: number;
};

export class BankFeeResponse extends BaseResponse<
  BankFeeAttributes,
  "bank_fees"
> {}
