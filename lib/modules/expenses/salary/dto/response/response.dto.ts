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
//
// export type SalaryResponse = BaseResponse<SalaryAttributes, "salaries">;
