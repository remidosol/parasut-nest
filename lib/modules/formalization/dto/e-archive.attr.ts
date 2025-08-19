import {
  PromoteResponseIdentifiers,
  RequestResource,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../types";

export type EArchiveAttributes = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  sales_invoice_id?: number;
};

export type EArchiveResponseRels = {
  sales_invoice?: ResponseRelationship<"sales_invoices">;
};

export type EArchiveRequestResource = RequestResource<"e_archives", any>;

export type EArchiveResponseResource = ResponseResource<
  "e_archives",
  EArchiveAttributes,
  EArchiveResponseRels
>;

type EArchiveResponseRelInc = ResponseIncludedFrom<EArchiveResponseResource>;

export type EArchiveResponseIncluded =
  PromoteResponseIdentifiers<EArchiveResponseRelInc>;
