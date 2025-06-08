import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";
import { TagArrayResponse } from "./dto/response";

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
  async getTags(queryParams?: any): Promise<TagArrayResponse> {
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
  async createTag(payload: any): Promise<any> {
    // Note: 'include' parameter is not shown in the API documentation for create tag.
    return this.parasutClient.post<any, any, any>("/tags", {}, payload);
  }

  /**
   * Retrieves a specific tag by its ID.
   * @param id - The ID of the tag.
   * @returns The tag.
   */
  async getTagById(id: number): Promise<any> {
    // Note: 'include' parameter is not shown in the API documentation for get tag by ID.
    return this.parasutClient.get<any, any>(`/tags/${id}`, {});
  }

  /**
   * Updates an existing tag.
   * @param id - The ID of the tag to update.
   * @param payload - The updated tag data. The payload should be structured according to the API,
   *                  typically { data: { id: "tagId", type: "tags", attributes: { name: "newName" } } }.
   * @returns The updated tag.
   */
  async updateTag(id: number, payload: any): Promise<any> {
    // Note: 'include' parameter is not shown in the API documentation for update tag.
    return this.parasutClient.put<any, any, any>(`/tags/${id}`, {}, payload);
  }

  /**
   * Deletes a tag by its ID.
   * @param id - The ID of the tag to delete.
   * @returns A promise that resolves when the tag is deleted (typically void or boolean).
   */
  async deleteTag(id: number): Promise<any> {
    // API returns 204 No Content.
    return this.parasutClient.delete<any>(`/tags/${id}`);
  }
}
