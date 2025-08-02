export type TaxAttributes = {
  total_paid?: number;
  archived?: boolean;
  remaining?: number;
  remaining_in_trl?: number;
  created_at?: Date;
  updated_at?: Date;
  description: string;
  issue_date: Date;
  due_date: Date;
  net_total: number;
};

// export type TaxResponse = BaseResponse<TaxAttributes, "taxes">;
