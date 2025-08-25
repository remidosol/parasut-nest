import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutEmployeeService } from "./employee.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutEmployeeService],
  exports: [ParasutEmployeeService],
})
export class ParasutEmployeeModule {}
