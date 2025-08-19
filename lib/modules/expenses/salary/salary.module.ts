import { Module } from "@nestjs/common";
import { ParasutSalaryService } from "./salary.service";

@Module({
  providers: [ParasutSalaryService],
  exports: [ParasutSalaryService],
})
export class ParasutSalaryModule {}
