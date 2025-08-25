import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutCategoryService } from "./category.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutCategoryService],
  exports: [ParasutCategoryService],
})
export class ParasutCategoryModule {}
