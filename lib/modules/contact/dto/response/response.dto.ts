import { BaseResponse } from "../../../../dto/response";
import { AccountType } from "../../../../types/common.enums";

export type InvoicingPreferences = {
  e_document_accounts?: number[];
};

export type ContactAttributes = {
  balance?: number;
  trl_balance?: number;
  usd_balance?: number;
  eur_balance?: number;
  gbp_balance?: number;
  created_at?: Date;
  updated_at?: Date;
  email?: string;
  name: string;
  short_name?: string;
  contact_type?: string;
  tax_office?: string;
  tax_number?: string;
  district?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  address?: string;
  phone?: string;
  fax?: string;
  is_abroad?: boolean;
  archived?: boolean;
  iban?: string;
  account_type: AccountType;
  untrackable?: boolean;
  invoicing_preferences?: InvoicingPreferences;
};

export class ContectResponse extends BaseResponse<
  ContactAttributes,
  "contacts"
> {}
