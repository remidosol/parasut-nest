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
}
