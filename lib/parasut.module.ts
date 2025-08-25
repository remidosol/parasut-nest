import { DynamicModule, Module } from "@nestjs/common";
import {
  ParasutModuleAsyncOptions,
  ParasutModuleOptions,
} from "./config/parasut-module.options";
import {
  ParasutBankFeeModule,
  ParasutContactModule,
  ParasutEmployeeModule,
  ParasutFormalizationModule,
  ParasutPurchaseBillModule,
  ParasutSalaryModule,
  ParasutSalesInvoiceModule,
  ParasutSalesOfferModule,
  ParasutTaxModule,
} from "./modules";
import { ParasutCoreModule } from "./parasut-core.module";

@Module({})
export class ParasutModule {
  static forRoot(options: ParasutModuleOptions): DynamicModule {
    return {
      imports: [
        ParasutCoreModule.forRoot(options),
        ParasutContactModule,
        ParasutBankFeeModule,
        ParasutEmployeeModule,
        ParasutPurchaseBillModule,
        ParasutSalaryModule,
        ParasutTaxModule,
        ParasutFormalizationModule,
        ParasutSalesOfferModule,
        ParasutSalesInvoiceModule,
      ],
      module: ParasutModule,
      exports: [
        ParasutContactModule,
        ParasutBankFeeModule,
        ParasutEmployeeModule,
        ParasutPurchaseBillModule,
        ParasutSalaryModule,
        ParasutTaxModule,
        ParasutFormalizationModule,
        ParasutSalesOfferModule,
        ParasutSalesInvoiceModule,
      ],
      global: options.global ?? false,
    };
  }

  static forRootAsync(options: ParasutModuleAsyncOptions): DynamicModule {
    return {
      module: ParasutModule,
      imports: [
        ...(options.imports ?? []),
        ParasutCoreModule.forRootAsync(options),
        ParasutContactModule,
        ParasutBankFeeModule,
        ParasutEmployeeModule,
        ParasutPurchaseBillModule,
        ParasutSalaryModule,
        ParasutTaxModule,
        ParasutFormalizationModule,
        ParasutSalesOfferModule,
        ParasutSalesInvoiceModule,
      ],
      exports: [
        ParasutContactModule,
        ParasutBankFeeModule,
        ParasutEmployeeModule,
        ParasutPurchaseBillModule,
        ParasutSalaryModule,
        ParasutTaxModule,
        ParasutFormalizationModule,
        ParasutSalesOfferModule,
        ParasutSalesInvoiceModule,
      ],
    };
  }
}
