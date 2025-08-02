import { SingleRequest } from "../../../../../dto/request";
import { BankFeeRequestResource } from "../bank-fee.attr";

export type UpdateBankFeeRequest = Partial<
  SingleRequest<BankFeeRequestResource>
>;
