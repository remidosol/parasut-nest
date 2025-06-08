import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";

@Injectable()
export class ParasutBankFeeService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutBankFeeService.name);
  }

  /**
   * Creates a new bank fee.
   * @param payload - The bank fee data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The created bank fee.
   */
  async createBankFee(payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.post<any, any, any>(
      "/bank_fees",
      params,
      payload
    );
    return response;
  }

  /**
   * Retrieves a specific bank fee by its ID.
   * @param id - The ID of the bank fee.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The bank fee.
   */
  async getBankFeeById(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.get<any, any>(
      `/bank_fees/${id}`,
      params
    );
    return response;
  }

  /**
   * Updates an existing bank fee.
   * @param id - The ID of the bank fee to update.
   * @param payload - The updated bank fee data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The updated bank fee.
   */
  async updateBankFee(
    id: number,
    payload: any,
    include?: string
  ): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.put<any, any, any>(
      `/bank_fees/${id}`,
      params,
      payload
    );
    return response;
  }

  /**
   * Deletes a bank fee by its ID.
   * @param id - The ID of the bank fee to delete.
   * @returns A promise that resolves when the bank fee is deleted.
   */
  async deleteBankFee(id: number): Promise<any> {
    const response = await this.parasutClient.delete<any>(`/bank_fees/${id}`);
    return response;
  }

  /**
   * Archives a bank fee by its ID.
   * @param id - The ID of the bank fee to archive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The archived bank fee.
   */
  async archiveBankFee(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.patch<any, any>(
      `/bank_fees/${id}/archive`,
      params
    );
    return response;
  }

  /**
   * Unarchives a bank fee by its ID.
   * @param id - The ID of the bank fee to unarchive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The unarchived bank fee.
   */
  async unarchiveBankFee(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.patch<any, any>(
      `/bank_fees/${id}/unarchive`,
      params
    );
    return response;
  }

  /**
   * Pays a bank fee.
   * @param id - The ID of the bank fee.
   * @param payload - The payment data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "payable,transaction").
   * @returns The payment transaction.
   */
  async payBankFee(id: number, payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include;
    }

    const response = await this.parasutClient.post<any, any, any>(
      `/bank_fees/${id}/payments`,
      params,
      payload
    );
    return response;
  }
}
