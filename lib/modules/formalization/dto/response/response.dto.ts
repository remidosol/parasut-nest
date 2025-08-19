import { CollectionResponse, SingleResponse } from "../../../../dto/response";
import {
  EArchiveResponseIncluded,
  EArchiveResponseResource,
} from "../e-archive.attr";
import {
  EInvoiceResponseIncluded,
  EInvoiceResponseResource,
} from "../e-invoice.attr";
import {
  EInvoiceInboxResponseIncluded,
  EInvoiceInboxResponseResource,
} from "../e-invoice-inbox.attr";
import { ESmmResponseIncluded, ESmmResponseResource } from "../e-smm.attr";

export type IndexEInvoiceInboxResponse = CollectionResponse<
  EInvoiceInboxResponseResource,
  EInvoiceInboxResponseIncluded[]
>;

export type CreateEArchiveResponse = SingleResponse<
  EArchiveResponseResource,
  EArchiveResponseIncluded[]
>;

export type GetEArchiveResponse = SingleResponse<
  EArchiveResponseResource,
  EArchiveResponseIncluded[]
>;

export type EArchivePdfResponse = any;

export type CreateEInvoiceResponse = SingleResponse<
  EInvoiceResponseResource,
  EInvoiceResponseIncluded[]
>;

export type GetEInvoiceResponse = SingleResponse<
  EInvoiceResponseResource,
  EInvoiceResponseIncluded[]
>;

export type EInvoicePdfResponse = any;

export type CreateESmmResponse = SingleResponse<
  ESmmResponseResource,
  ESmmResponseIncluded[]
>;

export type GetESmmResponse = SingleResponse<
  ESmmResponseResource,
  ESmmResponseIncluded[]
>;

export type ESmmPdfResponse = any;
