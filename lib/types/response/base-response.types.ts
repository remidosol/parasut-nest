import { EntityType } from "../common.types";

export type ResponseIncluded<T extends EntityType, Attrs = any, Rels = any> = {
  id?: string;
  type?: T;
  attributes?: Attrs;
  relationships?: Rels;
};

export type Links = {
  self?: string | null;
  first?: string | null;
  prev?: string | null;
  next?: string | null;
  last?: string | null;
};

export type Meta = {
  current_page?: number;
  total_pages?: number;
  total_count?: number;
  created_at?: Date;
  updated_at?: Date;
};

export interface ResponseResourceIdentifier<T extends EntityType = EntityType> {
  id: string;
  type: T;
}

export type ResponseRelationship<
  T extends EntityType,
  Many extends boolean = false,
> = Many extends true
  ? { data: ResponseResourceIdentifier<T>[] }
  : { data: ResponseResourceIdentifier<T> };

export type ResponseRelationshipsMap = {
  [k: string]: ResponseRelationship<any, boolean>;
};

export interface ResponseResource<
  T extends EntityType,
  Attr,
  Rels extends ResponseRelationshipsMap = {},
> extends ResponseResourceIdentifier<T> {
  attributes: Attr;
  relationships?: Rels;
}

export type ResponseIncludedFrom<R> = R extends { relationships?: infer Rel }
  ? Rel extends ResponseRelationshipsMap
    ? {
        [K in keyof Rel]-?: Rel[K] extends ResponseRelationship<
          infer T,
          infer Many
        >
          ? Many extends true
            ? ResponseResourceIdentifier<T>[]
            : ResponseResourceIdentifier<T>
          : never;
      }[keyof Rel]
    : never
  : never;

// export type BaseResponseData<Attrs, Type extends EntityType> = {
//   id?: string;
//   type?: Type;
//   attributes: Attrs;
//   relationships?: ResponseRelationshipsByType<Type>;
//   links?: Links;
//   meta?: Meta;
// };
