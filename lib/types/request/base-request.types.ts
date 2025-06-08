import { EntityType } from "../common.types";

export interface RequestResourceIdentifier<T extends EntityType = EntityType> {
  id?: string;
  type: T;
}

export type RequestRelationship<
  T extends EntityType,
  Many extends boolean = false,
  Attr = unknown,
  Rels extends RequestRelationshipsMap = {},
> = Many extends true
  ? { data: RequestResource<T, Attr, Rels>[] }
  : { data: RequestResource<T, Attr, Rels> };

export type RequestRelationshipsMap = {
  [k: string]: RequestRelationship<any, boolean, any, any>;
};

export interface RequestResource<
  T extends EntityType,
  Attr = unknown,
  Rels extends RequestRelationshipsMap = {},
> extends RequestResourceIdentifier<T> {
  attributes?: Attr;
  relationships?: Rels;
}

export type RequestNestedFrom<R> = R extends { relationships?: infer Rel }
  ? Rel extends RequestRelationshipsMap
    ? {
        [K in keyof Rel]-?: Rel[K] extends RequestRelationship<
          infer T,
          infer Many,
          infer A,
          infer Rl
        >
          ? Many extends true
            ? RequestResource<T, A, Rl>[]
            : RequestResource<T, A, Rl>
          : never;
      }[keyof Rel]
    : never
  : never;
