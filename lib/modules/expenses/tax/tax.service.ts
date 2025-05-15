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
}
