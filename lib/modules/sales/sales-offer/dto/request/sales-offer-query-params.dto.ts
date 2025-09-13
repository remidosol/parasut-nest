import { BasePaginationParams } from "../../../../../dto/request/base-pagination.request";

export type SalesOfferSortableKeys =
  | "id"
  | "issue_date"
  | "description"
  | "net_total_in_trl"
  | "sales_invoice_id";

export type SalesOfferQueryParams = {
  filter?: {
    archived?: boolean;
    query?: string;
    invoice_status?: string;
    status?: string;
  };
  sort?: SalesOfferSortableKeys | `-${SalesOfferSortableKeys}`;
  page?: {
    number?: number;
    size?: number;
  };
  include?: ("contact" | "sales_invoice" | "product")[];
};

export class SalesOfferPaginationParams extends BasePaginationParams<
  SalesOfferSortableKeys,
  "sales_offers"
> {
  constructor(params?: SalesOfferQueryParams) {
    super();
    if (params) {
      this.sort = params.sort;
      this["page[number]"] = params.page?.number;
      this.include = params.include as any;
    }
  }
}
