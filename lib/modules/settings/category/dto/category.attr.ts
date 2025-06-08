import {
  PromoteResponseIdentifiers,
  ResponseIncludedFrom,
  ResponseRelationship,
  ResponseResource,
} from "../../../../types";

export type CategoryAttributes = {
  full_path?: string;
  created_at?: Date;
  updated_at?: Date;
  name?: string;
  bg_color?: string;
  text_color?: string;
  category_type?: string;
  parent_id?: number;
};

export type CategoryResponseRels = {
  parent_category: ResponseRelationship<"item_categories">;
  subcategories: ResponseRelationship<"item_categories", true>;
};

export type CategoryResponseResource = ResponseResource<
  "item_categories",
  CategoryAttributes,
  CategoryResponseRels
>;

type CategoryResponseRelInc = ResponseIncludedFrom<CategoryResponseResource>;

export type CategoryResponseIncluded =
  PromoteResponseIdentifiers<CategoryResponseRelInc>;
