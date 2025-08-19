import { Module } from "@nestjs/common";
import { ParasutTaxService } from "./tax.service";

@Module({
  providers: [ParasutTaxService],
  exports: [ParasutTaxService],
})
export class ParasutTaxModule {}
