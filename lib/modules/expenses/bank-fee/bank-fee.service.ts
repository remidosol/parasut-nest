import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";
import { RequestIncludeByType } from "../../../types";
import {
  CreateBankFeeRequest,
  PayBankFeeRequest,
  UpdateBankFeeRequest,
} from "./dto/request";
import {
  CreateBankFeeResponse,
  GetBankFeeResponse,
  PayBankFeeResponse,
  UpdateBankFeeResponse,
} from "./dto/response";

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
  async createBankFee(
    payload: CreateBankFeeRequest,
    include?: RequestIncludeByType<"bank_fees">
  ): Promise<CreateBankFeeResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.post<
      CreateBankFeeResponse,
      CreateBankFeeRequest,
      { include?: string }
    >("/bank_fees", params, payload);

    return response;
  }

  /**
   * Retrieves a specific bank fee by its ID.
   * @param id - The ID of the bank fee.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The bank fee.
   */
  async getBankFeeById(
    id: number,
    include?: RequestIncludeByType<"bank_fees">
  ): Promise<GetBankFeeResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.get<
      GetBankFeeResponse,
      { include?: string }
    >(`/bank_fees/${id}`, params);
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
    payload: UpdateBankFeeRequest,
    include?: RequestIncludeByType<"bank_fees">
  ): Promise<UpdateBankFeeResponse> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.put<
      UpdateBankFeeResponse,
      UpdateBankFeeRequest,
      { include?: string }
    >(`/bank_fees/${id}`, params, payload);
    return response;
  }

  /**
   * Deletes a bank fee by its ID.
   * @param id - The ID of the bank fee to delete.
   * @returns A promise that resolves when the bank fee is deleted.
   */
  async deleteBankFee(id: number): Promise<boolean> {
    const response = await this.parasutClient.delete(`/bank_fees/${id}`);

    return response;
  }

  /**
   * Archives a bank fee by its ID.
   * @param id - The ID of the bank fee to archive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The archived bank fee.
   */
  async archiveBankFee(
    id: number,
    include?: RequestIncludeByType<"bank_fees">
  ): Promise<GetBankFeeResponse> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.patch<
      GetBankFeeResponse,
      undefined,
      { include?: string }
    >(`/bank_fees/${id}/archive`, params);
    return response;
  }

  /**
   * Unarchives a bank fee by its ID.
   * @param id - The ID of the bank fee to unarchive.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,tags").
   * @returns The unarchived bank fee.
   */
  async unarchiveBankFee(
    id: number,
    include?: RequestIncludeByType<"bank_fees">
  ): Promise<GetBankFeeResponse> {
    const params: { include?: string } = {};
    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.patch<
      GetBankFeeResponse,
      undefined,
      { include?: string }
    >(`/bank_fees/${id}/unarchive`, params);
    return response;
  }

  /**
   * Pays a bank fee.
   * @param id - The ID of the bank fee.
   * @param payload - The payment data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "payable,transaction").
   * @returns The payment transaction.
   */
  async payBankFee(
    id: number,
    payload: PayBankFeeRequest
  ): Promise<PayBankFeeResponse> {
    const response = await this.parasutClient.post<
      PayBankFeeResponse,
      PayBankFeeRequest
    >(`/bank_fees/${id}/payments`, undefined, payload);

    return response;
  }
}
