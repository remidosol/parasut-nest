import { IsEmail, IsEnum, IsString, ValidateIf } from "class-validator";

export type ContactFilterParamsType = Pick<
  ContactFilterParams,
  | "filter[account_type]"
  | "filter[city]"
  | "filter[email]"
  | "filter[name]"
  | "filter[tax_number]"
  | "filter[tax_office]"
>;

export class ContactFilterParams {
  @ValidateIf((o: ContactFilterParams) => o["filter[name]"] !== undefined)
  @IsString()
  "filter[name]"?: string;

  @ValidateIf((o: ContactFilterParams) => o["filter[email]"] !== undefined)
  @IsString()
  @IsEmail({})
  "filter[email]"?: string;

  @ValidateIf((o: ContactFilterParams) => o["filter[tax_number]"] !== undefined)
  @IsString()
  "filter[tax_number]"?: string;

  @ValidateIf((o: ContactFilterParams) => o["filter[tax_office]"] !== undefined)
  @IsString()
  "filter[tax_office]"?: string;

  @ValidateIf((o: ContactFilterParams) => o["filter[city]"] !== undefined)
  @IsString()
  "filter[city]"?: string;

  @ValidateIf(
    (o: ContactFilterParams) => o["filter[account_type]"] !== undefined
  )
  @IsEnum(["customer", "supplier"])
  @IsString()
  "filter[account_type]"?: "customer" | "supplier";

  constructor(dto?: ContactFilterParamsType) {
    if (dto) {
      this["filter[name]"] = dto["filter[name]"];
      this["filter[email]"] = dto["filter[email]"];
      this["filter[tax_number]"] = dto["filter[tax_number]"];
      this["filter[tax_office]"] = dto["filter[tax_office]"];
      this["filter[city]"] = dto["filter[city]"];
      this["filter[account_type]"] = dto["filter[account_type]"];
    }
  }

  toString(): string {
    const params: string[] = [];

    if (this["filter[name]"]) {
      params.push(`filter[name]=${this["filter[name]"]}`);
    }
    if (this["filter[email]"]) {
      params.push(`filter[email]=${this["filter[email]"]}`);
    }
    if (this["filter[tax_number]"]) {
      params.push(`filter[tax_number]=${this["filter[tax_number]"]}`);
    }
    if (this["filter[tax_office]"]) {
      params.push(`filter[tax_office]=${this["filter[tax_office]"]}`);
    }
    if (this["filter[city]"]) {
      params.push(`filter[city]=${this["filter[city]"]}`);
    }
    if (this["filter[account_type]"]) {
      params.push(`filter[account_type]=${this["filter[account_type]"]}`);
    }

    return params.join("&");
  }

  toJson(): ContactFilterParamsType {
    const params: Record<string, string> = {};

    if (this["filter[name]"]) {
      params["filter[name]"] = this["filter[name]"];
    }
    if (this["filter[email]"]) {
      params["filter[email]"] = this["filter[email]"];
    }
    if (this["filter[tax_number]"]) {
      params["filter[tax_number]"] = this["filter[tax_number]"];
    }
    if (this["filter[tax_office]"]) {
      params["filter[tax_office]"] = this["filter[tax_office]"];
    }
    if (this["filter[city]"]) {
      params["filter[city]"] = this["filter[city]"];
    }
    if (this["filter[account_type]"]) {
      params["filter[account_type]"] = this["filter[account_type]"];
    }

    return params;
  }
}
