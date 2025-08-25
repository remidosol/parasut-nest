import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutSalaryService } from "./salary.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutSalaryService],
  exports: [ParasutSalaryService],
})
export class ParasutSalaryModule {}
