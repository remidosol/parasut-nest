import { Module } from "@nestjs/common";
import { ParasutEmployeeService } from "./employee.service";

@Module({
  providers: [ParasutEmployeeService],
  exports: [ParasutEmployeeService],
})
export class ParasutEmployeeModule {}
