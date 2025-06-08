import {
  PromoteResponseIdentifiers,
  ResponseIncludedFrom,
  ResponseResource,
} from "../../../../types";

export type TagAttributes = {
  created_at?: Date;
  updated_at?: Date;
  name: string;
};

export type TagResponseRels = any;

export type TagResponseResource = ResponseResource<
  "tags",
  TagAttributes,
  TagResponseRels
>;

type TagResponseRelInc = ResponseIncludedFrom<TagResponseResource>;

export type TagResponseIncluded = PromoteResponseIdentifiers<TagResponseRelInc>;
