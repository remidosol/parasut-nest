import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { SingleRequest } from "../../../dto/request";
import { ParasutHttpClient } from "../../../parasut.client";
import { RequestIncludeByType } from "../../../types";
import { CategoryRequestResource } from "./dto/category.attr";
import {
  CategoryArrayResponse,
  CategoryResponse,
} from "./dto/response/response.dto";

@Injectable()
export class ParasutCategoryService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutCategoryService.name);
  }

  /**O
   * Retrieves a list of item categories.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   *   - filter: { name?: string, category_type?: string }
   *   - sort: string (e.g., "id", "name", "category_type")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "parent_category,subcategories")
   * @returns A list of item categories.
   */
  async getItemCategories(queryParams?: {
    filter?: { name?: string; category_type?: string };
    sort?: string;
    page?: { number?: number; size?: number };
    include?: string;
  }): Promise<CategoryArrayResponse> {
    const params: any = {};

    if (queryParams) {
      if (queryParams.filter) {
        if (queryParams.filter.name)
          params["filter[name]"] = queryParams.filter.name;
        if (queryParams.filter.category_type)
          params["filter[category_type]"] = queryParams.filter.category_type;
      }
      if (queryParams.sort) params.sort = queryParams.sort;
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) params.include = queryParams.include;
    }

    return this.parasutClient.get<CategoryArrayResponse, any>(
      "/item_categories",
      params
    );
  }

  /**
   * Creates a new item category.
   * @param payload - The item category data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "parent_category,subcategories").
   * @returns The created item category.
   */
  async createItemCategory(
    payload: SingleRequest<CategoryRequestResource>,
    include?: RequestIncludeByType<"item_categories">
  ): Promise<CategoryResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    return this.parasutClient.post<
      CategoryResponse,
      SingleRequest<CategoryRequestResource>,
      { include?: string }
    >("/item_categories", params, payload);
  }

  /**
   * Retrieves a specific item category by its ID.
   * @param id - The ID of the item category.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "parent_category,subcategories").
   * @returns The item category.
   */
  async getItemCategoryById(
    id: number,
    include?: RequestIncludeByType<"item_categories">
  ): Promise<CategoryResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    return this.parasutClient.get<CategoryResponse, { include?: string }>(
      `/item_categories/${id}`,
      params
    );
  }

  /**
   * Updates an existing item category.
   * @param id - The ID of the item category to update.
   * @param payload - The updated item category data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "parent_category,subcategories").
   * @returns The updated item category.
   */
  async updateItemCategory(
    id: number,
    payload: Partial<SingleRequest<CategoryRequestResource>>,
    include?: string
  ): Promise<CategoryResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include;

    return this.parasutClient.put<
      CategoryResponse,
      Partial<SingleRequest<CategoryRequestResource>>,
      { include?: string }
    >(`/item_categories/${id}`, params, payload);
  }

  /**
   * Deletes an item category by its ID.
   * @param id - The ID of the item category to delete.
   * @returns A promise that resolves when the item category is deleted (typically void or boolean).
   */
  async deleteItemCategory(id: number): Promise<boolean> {
    return this.parasutClient.delete(`/item_categories/${id}`);
  }
}
