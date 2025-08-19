import {
  PromoteResponseIdentifiers,
  RequestNestedFrom,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";
import { PromoteRequestIdentifiers } from "../../../types/request/request-resource.types";

export type TransactionRequestAttributes = {
  description?: string;
  account_id?: number;
  date?: Date;
  amount?: number;
  exchange_rate?: number;
  payable_ids?: number[];
};

export type TransactionResponseAttributes = {
  created_at?: Date;
  updated_at?: Date;
  description?: string;
  transaction_type?: string;
  date?: Date;
  amount_in_trl?: number;
  debit_amount?: number;
  debit_currency?: string;
  credit_amount?: number;
  credit_currency?: string;
};

export type TransactionResponseRels = {
  debit_account: ResponseRelationship<"accounts">;
  credit_account: ResponseRelationship<"accounts">;
  payments: ResponseRelationship<"payments", true>;
};

export type TransactionRequestResource = RequestResource<
  "transactions",
  TransactionRequestAttributes
>;

export type TransactionRequestNested =
  RequestNestedFrom<TransactionRequestResource>;

export type TransactionRequestPromotedInc =
  PromoteRequestIdentifiers<TransactionRequestNested>;

export type TransactionResponseResource = ResponseResource<
  "transactions",
  TransactionResponseAttributes,
  TransactionResponseRels
>;

type TransactionResponseRelInc =
  ResponseIncludedFrom<TransactionResponseResource>;

export type TransactionResponseIncluded =
  PromoteResponseIdentifiers<TransactionResponseRelInc>;
