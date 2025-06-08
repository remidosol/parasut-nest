import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";

@Injectable()
export class ParasutSalaryService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutSalaryService.name);
  }

  /**
   * Retrieves a list of salaries.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   *   - filter: { due_date?: string, issue_date?: string, currency?: string, remaining?: number }
   *   - sort: string (e.g., "issue_date", "-net_total")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "employee,category,tags")
   * @returns A list of salaries.
   */
  async getSalaries(queryParams?: any): Promise<any> {
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
          // remaining can be 0
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

    return this.parasutClient.get<any, any>("/salaries", params);
  }

  /**
   * Creates a new salary.
   * @param payload - The salary data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "employee,category,tags").
   * @returns The created salary.
   */
  async createSalary(payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.post<any, any, any>("/salaries", params, payload);
  }

  /**
   * Retrieves a specific salary by its ID.
   * @param id - The ID of the salary.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "employee,category,tags").
   * @returns The salary.
   */
  async getSalaryById(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.get<any, any>(`/salaries/${id}`, params);
  }

  /**
   * Updates an existing salary.
   * @param id - The ID of the salary to update.
   * @param payload - The updated salary data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "employee,category,tags").
   * @returns The updated salary.
   */
  async updateSalary(id: number, payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.put<any, any, any>(
      `/salaries/${id}`,
      params,
      payload
    );
  }

  /**
   * Deletes a salary by its ID.
   * @param id - The ID of the salary to delete.
   * @returns A promise that resolves when the salary is deleted.
   */
  async deleteSalary(id: number): Promise<any> {
    return this.parasutClient.delete<any>(`/salaries/${id}`);
  }

  /**
   * Archives a salary by its ID.
   * @param id - The ID of the salary to archive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "employee,category,tags").
   * @returns The archived salary.
   */
  async archiveSalary(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.patch<any, any>(
      `/salaries/${id}/archive`,
      params
    );
  }

  /**
   * Unarchives a salary by its ID.
   * @param id - The ID of the salary to unarchive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "employee,category,tags").
   * @returns The unarchived salary.
   */
  async unarchiveSalary(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.patch<any, any>(
      `/salaries/${id}/unarchive`,
      params
    );
  }

  /**
   * Pays a salary.
   * @param id - The ID of the salary.
   * @param payload - The payment data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "payable,transaction").
   * @returns The payment transaction.
   */
  async paySalary(id: number, payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.post<any, any, any>(
      `/salaries/${id}/payments`,
      params,
      payload
    );
  }
}
