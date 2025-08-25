import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutTaxService } from "./tax.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutTaxService],
  exports: [ParasutTaxService],
})
export class ParasutTaxModule {}
