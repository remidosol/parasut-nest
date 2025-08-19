import { Module } from "@nestjs/common";
import { ParasutBankFeeService } from "./bank-fee.service";

@Module({
  providers: [ParasutBankFeeService],
  exports: [ParasutBankFeeService],
})
export class ParasutBankFeeModule {}
