import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../parasut-core.module";
import { ParasutContactService } from "./contact.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutContactService],
  exports: [ParasutContactService],
})
export class ParasutContactModule {}
