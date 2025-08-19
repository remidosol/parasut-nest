import { IsEmail, IsString, ValidateIf } from "class-validator";

export type EmployeeFilterParamsType = Pick<
  EmployeeFilterParams,
  "filter[email]" | "filter[name]"
>;

export class EmployeeFilterParams {
  @ValidateIf((o: EmployeeFilterParams) => o["filter[name]"] !== undefined)
  @IsString()
  "filter[name]"?: string;

  @ValidateIf((o: EmployeeFilterParams) => o["filter[email]"] !== undefined)
  @IsString()
  @IsEmail({})
  "filter[email]"?: string;

  constructor(dto?: EmployeeFilterParamsType) {
    if (dto) {
      this["filter[name]"] = dto["filter[name]"];
      this["filter[email]"] = dto["filter[email]"];
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

    return params.join("&");
  }

  toJson(): EmployeeFilterParamsType {
    const params: Record<string, string> = {};

    if (this["filter[name]"]) {
      params["filter[name]"] = this["filter[name]"];
    }
    if (this["filter[email]"]) {
      params["filter[email]"] = this["filter[email]"];
    }

    return params;
  }
}
