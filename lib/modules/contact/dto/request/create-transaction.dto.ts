import { SingleRequest } from "../../../../dto/request";
import { TransactionRequestResource } from "../transaction.attr";

export type CreateTransactionRequest =
  SingleRequest<TransactionRequestResource>;
