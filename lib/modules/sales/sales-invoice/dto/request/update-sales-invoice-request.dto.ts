import { SingleRequest } from "../../../../../dto/request";
import { SalesInvoiceRequestResource } from "../sales-invoice.attr";

export type UpdateSalesInvoiceRequest = Partial<
  SingleRequest<SalesInvoiceRequestResource>
>;
