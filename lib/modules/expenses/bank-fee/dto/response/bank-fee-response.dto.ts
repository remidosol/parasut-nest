import { SingleResponse } from "../../../../../dto/response";
import {
  BankFeeResponseIncluded,
  BankFeeResponseResource,
} from "../bank-fee.attr";

export type CreateBankFeeResponse = SingleResponse<
  BankFeeResponseResource,
  BankFeeResponseIncluded[]
>;

export type GetBankFeeResponse = SingleResponse<
  BankFeeResponseResource,
  BankFeeResponseIncluded[]
>;

export type UpdateBankFeeResponse = SingleResponse<
  BankFeeResponseResource,
  BankFeeResponseIncluded[]
>;
