import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";

@Injectable()
export class ParasutTaxService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutTaxService.name);
  }

  /**
   * Retrieves a list of taxes.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   *   - filter: { due_date?: string, issue_date?: string, currency?: string, remaining?: number }
   *   - sort: string (e.g., "issue_date", "-net_total")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "category,tags")
   * @returns A list of taxes.
   */
  async getTaxes(queryParams?: any): Promise<any> {
    const params: any = {};
    if (queryParams) {
      if (queryParams.filter) {
        if (queryParams.filter.due_date)
          params["filter[due_date]"] = queryParams.filter.due_date;
        if (queryParams.filter.issue_date)
          params["filter[issue_date]"] = queryParams.filter.issue_date;
        if (queryParams.filter.currency)
          params["filter[currency]"] = queryParams.filter.currency;
        if (queryParams.filter.remaining !== undefined)
          params["filter[remaining]"] = queryParams.filter.remaining;
      }
      if (queryParams.sort) params.sort = queryParams.sort;
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) params.include = queryParams.include;
    }

    return this.parasutClient.get<any, any>("/taxes", params);
  }

  /**
   * Creates a new tax.
   * @param payload - The tax data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The created tax.
   */
  async createTax(payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.post<any, any, any>("/taxes", params, payload);
  }

  /**
   * Retrieves a specific tax by its ID.
   * @param id - The ID of the tax.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The tax.
   */
  async getTaxById(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.get<any, any>(`/taxes/${id}`, params);
  }

  /**
   * Updates an existing tax.
   * @param id - The ID of the tax to update.
   * @param payload - The updated tax data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The updated tax.
   */
  async updateTax(id: number, payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.put<any, any, any>(
      `/taxes/${id}`,
      params,
      payload
    );
  }

  /**
   * Deletes a tax by its ID.
   * @param id - The ID of the tax to delete.
   * @returns A promise that resolves when the tax is deleted.
   */
  async deleteTax(id: number): Promise<any> {
    return this.parasutClient.delete<any>(`/taxes/${id}`);
  }

  /**
   * Archives a tax by its ID.
   * @param id - The ID of the tax to archive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The archived tax.
   */
  async archiveTax(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.patch<any, any>(`/taxes/${id}/archive`, params);
  }

  /**
   * Unarchives a tax by its ID.
   * @param id - The ID of the tax to unarchive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The unarchived tax.
   */
  async unarchiveTax(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.patch<any, any>(`/taxes/${id}/unarchive`, params);
  }

  /**
   * Pays a tax.
   * @param id - The ID of the tax.
   * @param payload - The payment data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "payable,transaction").
   * @returns The payment transaction.
   */
  async payTax(id: number, payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.post<any, any, any>(
      `/taxes/${id}/payments`,
      params,
      payload
    );
  }
}
