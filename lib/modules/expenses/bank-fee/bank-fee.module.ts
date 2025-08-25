import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutBankFeeService } from "./bank-fee.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutBankFeeService],
  exports: [ParasutBankFeeService],
})
export class ParasutBankFeeModule {}
