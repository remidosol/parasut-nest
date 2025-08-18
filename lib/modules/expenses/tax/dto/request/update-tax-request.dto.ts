import { SingleRequest } from "../../../../../dto/request";
import { TaxRequestResource } from "../tax.attr";

export type UpdateTaxRequest = Partial<SingleRequest<TaxRequestResource>>;
