import { BadRequestException, Injectable } from "@nestjs/common";
import { validate } from "class-validator";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";
import { RequestIncludeByType } from "../../../types";
import {
  CreateEmployeeRequest,
  EmployeeFilterParams,
  EmployeeFilterParamsType,
  EmployeePaginationParams,
  EmployeePaginationParamsType,
  UpdateEmployeeRequest,
} from "./dto/request";
import {
  CreateEmployeeResponse,
  GetEmployeeResponse,
  IndexEmployeeResponse,
  UpdateEmployeeResponse,
} from "./dto/response";

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
  async getEmployees(
    filter?: EmployeeFilterParamsType,
    pagination?: EmployeePaginationParamsType
  ): Promise<IndexEmployeeResponse> {
    let filterParams = new EmployeeFilterParams(filter);
    let paginationParams = new EmployeePaginationParams(pagination);

    if (filter) {
      const filterErrors = await validate(filterParams);

      if (filterErrors.length > 0) {
        this.logger.error("Filter validation failed", filterErrors);
        throw new BadRequestException("Filter validation failed");
      }
    }

    if (pagination) {
      const paginationErrors = await validate(paginationParams);

      if (paginationErrors.length > 0) {
        this.logger.error("Pagination validation failed", paginationErrors);
        throw new BadRequestException("Pagination validation failed");
      }
    }

    const response = await this.parasutClient.get<
      IndexEmployeeResponse,
      EmployeeFilterParamsType & EmployeePaginationParamsType
    >("/employees", {
      ...filterParams.toJson(),
      ...paginationParams.toJson(),
    });
    return response;
  }

  /**
   * Creates a new employee.
   * @param payload - The employee data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The created employee.
   */
  async createEmployee(
    payload: CreateEmployeeRequest,
    include?: RequestIncludeByType<"employees">
  ): Promise<CreateEmployeeResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.post<
      CreateEmployeeResponse,
      CreateEmployeeRequest,
      typeof params
    >("/employees", params, payload);

    return response;
  }

  /**
   * Retrieves a specific employee by their ID.
   * @param id - The ID of the employee.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The employee.
   */
  async getEmployeeById(
    id: number,
    include?: RequestIncludeByType<"employees">
  ): Promise<GetEmployeeResponse> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.get<GetEmployeeResponse>(
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
    payload: UpdateEmployeeRequest,
    include?: RequestIncludeByType<"employees">
  ): Promise<UpdateEmployeeResponse> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.put<
      UpdateEmployeeResponse,
      UpdateEmployeeRequest,
      typeof params
    >(`/employees/${id}`, params, payload);
    return response;
  }

  /**
   * Deletes an employee by their ID.
   * @param id - The ID of the employee to delete.
   * @returns A promise that resolves when the employee is deleted.
   */
  async deleteEmployee(id: number): Promise<boolean> {
    const response = await this.parasutClient.delete(`/employees/${id}`);
    return response;
  }

  /**
   * Archives an employee by their ID.
   * @param id - The ID of the employee to archive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The archived employee.
   */
  async archiveEmployee(
    id: number,
    include?: RequestIncludeByType<"employees">
  ): Promise<GetEmployeeResponse> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.patch<
      GetEmployeeResponse,
      undefined,
      { include?: string }
    >(`/employees/${id}/archive`, params);
    return response;
  }

  /**
   * Unarchives an employee by their ID.
   * @param id - The ID of the employee to unarchive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,managed_by_user,managed_by_user_role").
   * @returns The unarchived employee.
   */
  async unarchiveEmployee(
    id: number,
    include?: RequestIncludeByType<"employees">
  ): Promise<GetEmployeeResponse> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.patch<
      GetEmployeeResponse,
      undefined,
      { include?: string }
    >(`/employees/${id}/unarchive`, params);
    return response;
  }
}
