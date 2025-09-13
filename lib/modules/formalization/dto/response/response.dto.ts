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

export type EDocumentPdfResponse = {
  data: {
    type: "e_document_pdfs";
    id: string;
    attributes: {
      url: string;
      expires_at: string; // ISO 8601
    };
    relationships: null;
  };
};

export type CreateEInvoiceResponse = {
  data: {
    id: string;
    type: "trackable_jobs";
    attributes: {
      status: "running" | "done" | "error";
      errors?: string[];
    };
    relationships: null;
  };
};

export type GetEInvoiceResponse = SingleResponse<
  EInvoiceResponseResource,
  EInvoiceResponseIncluded[]
>;

export type CreateESmmResponse = SingleResponse<
  ESmmResponseResource,
  ESmmResponseIncluded[]
>;

export type GetESmmResponse = SingleResponse<
  ESmmResponseResource,
  ESmmResponseIncluded[]
>;
