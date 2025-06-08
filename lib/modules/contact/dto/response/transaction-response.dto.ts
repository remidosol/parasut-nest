import { SingleResponse } from "../../../../dto/response";
import {
  TransactionResponseIncluded,
  TransactionResponseResource,
} from "../transaction.attr";

export type CreateTransactionResponse = SingleResponse<
  TransactionResponseResource,
  TransactionResponseIncluded[]
>;
