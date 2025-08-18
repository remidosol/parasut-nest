import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { SingleRequest } from "../../../dto/request";
import { ParasutHttpClient } from "../../../parasut.client";
import { TagArrayResponse, TagResponse } from "./dto/response";
import { TagRequestResource } from "./dto/tag.attr";

@Injectable()
export class ParasutTagService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutTagService.name);
  }

  /**
   * Retrieves a list of tags.
   * @param queryParams - Optional parameters for sorting and pagination.
   *   - sort: string (e.g., "id", "name")
   *   - page: { number?: number, size?: number }
   * @returns A list of tags.
   */
  async getTags(queryParams?: {
    sort?: string;
    page?: { number?: number; size?: number };
  }): Promise<TagArrayResponse> {
    const params: any = {};

    if (queryParams) {
      if (queryParams.sort) params.sort = queryParams.sort;
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
    }

    const response = await this.parasutClient.get<TagArrayResponse, any>(
      "/tags",
      params
    );

    return response;
  }

  /**
   * Creates a new tag.
   * @param payload - The tag data. The payload should be structured according to the API,
   *                  typically { data: { type: "tags", attributes: { name: "tagName" } } }.
   * @returns The created tag.
   */
  async createTag(
    payload: SingleRequest<TagRequestResource>
  ): Promise<TagResponse> {
    return this.parasutClient.post<
      TagResponse,
      SingleRequest<TagRequestResource>,
      Record<string, never>
    >("/tags", {}, payload);
  }

  /**
   * Retrieves a specific tag by its ID.
   * @param id - The ID of the tag.
   * @returns The tag.
   */
  async getTagById(id: number): Promise<TagResponse> {
    return this.parasutClient.get<TagResponse, Record<string, never>>(
      `/tags/${id}`,
      {}
    );
  }

  /**
   * Updates an existing tag.
   * @param id - The ID of the tag to update.
   * @param payload - The updated tag data. The payload should be structured according to the API,
   *                  typically { data: { id: "tagId", type: "tags", attributes: { name: "newName" } } }.
   * @returns The updated tag.
   */
  async updateTag(
    id: number,
    payload: Partial<SingleRequest<TagRequestResource>>
  ): Promise<TagResponse> {
    return this.parasutClient.put<
      TagResponse,
      Partial<SingleRequest<TagRequestResource>>,
      Record<string, never>
    >(`/tags/${id}`, {}, payload);
  }

  /**
   * Deletes a tag by its ID.
   * @param id - The ID of the tag to delete.
   * @returns A promise that resolves when the tag is deleted (typically void or boolean).
   */
  async deleteTag(id: number): Promise<boolean> {
    return this.parasutClient.delete(`/tags/${id}`);
  }
}
