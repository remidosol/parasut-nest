import { IsArray, IsNumber, IsString, ValidateIf } from "class-validator";
import { EntityType, RequestIncludeByType } from "../../types";

export type BasePaginationParamsType<
  SortableKeys extends string = string,
  IncludableRelation extends EntityType = EntityType,
  EndpointType extends "index" | "detail" = "index",
> = Pick<
  BasePaginationParams<SortableKeys, IncludableRelation, EndpointType>,
  "page[size]" | "page[number]" | "sort" | "include"
>;

export class BasePaginationParams<
  SortableKeys extends string = string,
  IncludableRelation extends EntityType = EntityType,
  EndpointType extends "index" | "detail" = "index",
> {
  @ValidateIf((o: BasePaginationParams) => o.sort !== undefined)
  @IsString()
  sort?: SortableKeys | `-${SortableKeys}`;

  @ValidateIf((o: BasePaginationParams) => o["page[size]"] !== undefined)
  @IsNumber()
  "page[size]"?: number;

  @ValidateIf((o: BasePaginationParams) => o["page[number]"] !== undefined)
  @IsNumber()
  "page[number]"?: number;

  @ValidateIf((o: BasePaginationParams) => o.include !== undefined)
  @IsArray()
  @IsString({ each: true })
  include?: RequestIncludeByType<IncludableRelation, EndpointType>;

  constructor(
    dto?: BasePaginationParamsType<
      SortableKeys,
      IncludableRelation,
      EndpointType
    >
  ) {
    if (dto) {
      this.sort = dto.sort;
      this["page[size]"] = dto["page[size]"];
      this["page[number]"] = dto["page[number]"];
      this.include = dto.include;
    }
  }

  toString(
    type: "url" | "urlWithPath" | "default" = "default",
    path?: string
  ): string {
    const params: string[] = [];

    if (this.sort) {
      params.push(`sort=${this.sort}`);
    }

    if (this["page[size]"]) {
      params.push(`page[size]=${this["page[size]"]}`);
    }

    if (this["page[number]"]) {
      params.push(`page[number]=${this["page[number]"]}`);
    }

    if (this.include) {
      params.push(`include=${this.include.join(",")}`);
    }

    if (type === "url") {
      return `?${params.join("&")}`;
    }

    if (type === "urlWithPath" && path) {
      return `${path}?${params.join("&")}`;
    }

    return params.join("&");
  }

  toJson(): BasePaginationParamsType<
    SortableKeys,
    IncludableRelation,
    EndpointType
  > {
    const params: Record<string, any> = {};

    if (this.sort) {
      params.sort = this.sort;
    }

    if (this["page[size]"]) {
      params["page[size]"] = this["page[size]"];
    }

    if (this["page[number]"]) {
      params["page[number]"] = this["page[number]"];
    }

    if (this.include) {
      params.include = this.include;
    }

    return params;
  }
}
