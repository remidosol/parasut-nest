import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";

@Injectable()
export class ParasutEmployeeService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutEmployeeService.name);
  }

  /**
   * Retrieves a list of employees.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   *   - filter: { name?: string, email?: string }
   *   - sort: string (e.g., "name", "-balance")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "category,managed_by_user,managed_by_user_role")
   * @returns A list of employees.
   */
  async getEmployees(queryParams?: any): Promise<any> {
    // Construct query parameters carefully for Paraşüt API
    const params: any = {};
    if (queryParams) {
      if (queryParams.filter) {
        if (queryParams.filter.name) {
          params["filter[name]"] = queryParams.filter.name;
        }
        if (queryParams.filter.email) {
          params["filter[email]"] = queryParams.filter.email;
        }
      }
      if (queryParams.sort) {
        params.sort = queryParams.sort;
      }
      if (queryParams.page) {
        if (queryParams.page.number) {
          params["page[number]"] = queryParams.page.number;
        }
        if (queryParams.page.size) {
          params["page[size]"] = queryParams.page.size;
        }
      }
      if (queryParams.include) {
        params.include = queryParams.include;
      }
    }

    const response = await this.parasutClient.get<any, any>(
      "/employees",
      params
    );
    return response;
  }

  /**
   * Creates a new employee.
   * @param payload - The employee data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The created employee.
   */
  async createEmployee(payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.post<any, any, any>(
      "/employees",
      params,
      payload
    );
    return response;
  }

  /**
   * Retrieves a specific employee by their ID.
   * @param id - The ID of the employee.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The employee.
   */
  async getEmployeeById(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.get<any, any>(
      `/employees/${id}`,
      params
    );
    return response;
  }

  /**
   * Updates an existing employee.
   * @param id - The ID of the employee to update.
   * @param payload - The updated employee data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The updated employee.
   */
  async updateEmployee(
    id: number,
    payload: any,
    include?: string
  ): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.put<any, any, any>(
      `/employees/${id}`,
      params,
      payload
    );
    return response;
  }

  /**
   * Deletes an employee by their ID.
   * @param id - The ID of the employee to delete.
   * @returns A promise that resolves when the employee is deleted.
   */
  async deleteEmployee(id: number): Promise<any> {
    const response = await this.parasutClient.delete<any>(`/employees/${id}`);
    return response;
  }

  /**
   * Archives an employee by their ID.
   * @param id - The ID of the employee to archive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The archived employee.
   */
  async archiveEmployee(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.patch<any, any>(
      `/employees/${id}/archive`,
      params
    );
    return response;
  }

  /**
   * Unarchives an employee by their ID.
   * @param id - The ID of the employee to unarchive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The unarchived employee.
   */
  async unarchiveEmployee(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.patch<any, any>(
      `/employees/${id}/unarchive`,
      params
    );
    return response;
  }
}
