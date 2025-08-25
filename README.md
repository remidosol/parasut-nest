# Parasut NestJS Module Documentation

This document provides comprehensive documentation for the `parasut-nest` npm package, a NestJS module designed to interact with the Parasut API. It covers the project structure, core components, common utilities, data transfer objects (DTOs), and detailed explanations of each module and its functionalities.

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Installation and Usage](#2-installation-and-usage)
3. [Core Components](#3-core-components)
    * [ParasutModule](#31-parasutmodule)
    * [ParasutHttpClient](#32-parasuthttpclient)
    * [ParasutConfig](#33-parasutconfig)
    * [Module Options and Providers](#34-module-options-and-providers)
    * [Enums and Constants](#35-enums-and-constants)
4. [Common Utilities](#4-common-utilities)
    * [Custom Exceptions](#41-custom-exceptions)
    * [Circuit Breaker](#42-circuit-breaker)
    * [Performance Metrics](#43-performance-metrics)
    * [Custom Logger](#44-custom-logger)
5. [Data Transfer Objects (DTOs) and Types](#5-data-transfer-objects-dtos-and-types)
    * [Request DTOs](#51-request-dtos)
    * [Response DTOs](#52-response-dtos)
    * [Common Types](#53-common-types)
6. [Modules](#6-modules)
    * [Contact Module](#61-contact-module)
    * [Expenses Module](#62-expenses-module)
        * [Bank Fee Sub-module](#621-bank-fee-sub-module)
        * [Employee Sub-module](#622-employee-sub-module)
        * [Purchase Bill Sub-module](#623-purchase-bill-sub-module)
        * [Salary Sub-module](#624-salary-sub-module)
        * [Tax Sub-module](#625-tax-sub-module)
    * [Formalization Module](#63-formalization-module)
    * [Sales Module](#64-sales-module)
        * [Sales Invoice Sub-module](#641-sales-invoice-sub-module)
        * [Sales Offer Sub-module](#642-sales-offer-sub-module)
    * [Settings Module](#65-settings-module)
        * [Category Sub-module](#651-category-sub-module)
        * [Tag Sub-module](#652-tag-sub-module)

---

## 1. Project Overview

The `parasut-nest` package is a NestJS module designed to provide a structured and efficient way to interact with the Parasut API. It leverages NestJS's modular architecture, dependency injection, and decorators to offer a robust client for various Parasut services, including contacts, expenses (bank fees, employees, purchase bills, salaries, taxes), formalization (e-invoices, e-archives, e-SMMs), sales (sales invoices, sales offers), and settings (categories, tags). The package emphasizes resilience through a circuit breaker implementation and provides a custom logger for enhanced observability.

## 2. Installation and Usage

*(This section will provide details on how to install the npm package and basic usage examples for synchronous and asynchronous module registration. As this information wasn't explicitly present in the scanned files, it will be a general placeholder.)*

To install the package, run:

```bash
npm install @remidosol/parasut-nest
# or
yarn add @remidosol/parasut-nest
```

**Synchronous Module Registration:**

```typescript
import { Module } from '@nestjs/common';
import { ParasutModule } from '@remidosol/parasut-nest'; 

@Module({
  imports: [
    ParasutModule.forRoot({
      credentials: {
        environment: ParasutEnvironment.PRODUCTION, // or DEV
        clientId: process.env.PARASUT_CLIENT_ID,
        clientSecret: process.env.PARASUT_CLIENT_SECRET,
        companyId: process.env.PARASUT_COMPANY_ID,
        email: process.env.PARASUT_EMAIL,
        password: process.env.PARASUT_PASSWORD,
        redirectUri: process.env.PARASUT_REDIRECT_URI,
      },
      timeout: 30000, // Optional: default to 20000ms
      global: true, // Optional: register globally
      circuitBreakerOptions: { enabled: true, failureThreshold: 5, resetTimeout: 30000 }, // Optional
      performanceMetricOptions: { enabled: true, maxMetrics: 100, storeMetrics: true, metricsTtl: 3600000 }, // Optional
      // logger: new CustomLoggerService(), // Optional: provide a custom logger
    }),
  ],
  // ...other module configurations
})
export class AppModule {}
```

**Asynchronous Module Registration:**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParasutModule, ParasutModuleOptions } from '@remidosol/parasut-nest'; 

@Module({
  imports: [
    ParasutModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<ParasutModuleOptions> => ({
        credentials: {
          environment: configService.get("NODE_ENV") === 'production' ? ParasutEnvironment.PRODUCTION : ParasutEnvironment.DEV,
          clientId: configService.get("PARASUT_CLIENT_ID"),
          clientSecret: configService.get("PARASUT_CLIENT_SECRET"),
          companyId: configService.get("PARASUT_COMPANY_ID"),
          email: configService.get("PARASUT_EMAIL"),
          password: configService.get("PARASUT_PASSWORD"),
          redirectUri: configService.get("PARASUT_REDIRECT_URI"),
        },
        timeout: 30000,
        // ... other options
      }),
      inject: [ConfigService],
    }),
  ],
  // ...other module configurations
})
export class AppModule {}
```

## 3. Core Components

### 3.1. ParasutModule

The `ParasutModule` is the main NestJS module that orchestrates the integration with the Parasut API. It offers both synchronous (`forRoot`) and asynchronous (`forRootAsync`) registration methods to provide flexible configuration options.

* **`forRoot(options: ParasutModuleOptions)`**:
  * Imports `ParasutCoreModule.forRoot()` to provide core services (`ParasutLoggerService`, `CircuitBreaker`, `PerformanceService`, `ParasutConfig`, and `ParasutHttpClient`).
  * Imports and makes available various feature modules (e.g., `ParasutContactModule`, `ParasutBankFeeModule`, etc.).
  * Allows enabling/disabling `CircuitBreaker` and `PerformanceService` based on provided options.
* **`forRootAsync(options: ParasutModuleAsyncOptions)`**:
  * Imports `ParasutCoreModule.forRootAsync()` to provide core services asynchronously.
  * Enables asynchronous configuration of the module, supporting `useFactory`, `useClass`, or `useExisting` patterns for dynamic options loading.

### 3.2. ParasutCoreModule

The `ParasutCoreModule` is a shared module that provides all the core services required by the Parasut integration. It's designed to be imported by both the main module and individual feature modules.

* **`forRoot(options: ParasutModuleOptions)`**:
  * Provides core services: `ParasutLoggerService`, `ParasutConfig`, `ParasutHttpClient`, and optionally `CircuitBreaker` and `PerformanceService`.
  * Registers all providers with proper dependency injection.
  * Exports all core services for use by feature modules.
* **`forRootAsync(options: ParasutModuleAsyncOptions)`**:
  * Provides the same core services asynchronously.
  * Supports dynamic configuration loading through various patterns.

### 3.3. ParasutHttpClient

The `ParasutHttpClient` is the central service for making HTTP requests to the Parasut API. It is built on top of `axios` and includes:

* **Authentication**: Manages access tokens and refresh tokens using the password grant type. It automatically refreshes tokens when they expire and re-authenticates if refreshing fails.
* **Request Interceptors**: Logs outgoing requests for debugging.
* **Response Interceptors**: Logs successful responses and handles errors, logging them for troubleshooting.
* **Circuit Breaker Integration**: Optionally integrates with `CircuitBreaker` to apply resilience patterns to API calls.
* **Generic HTTP Methods**: Provides wrapper methods for `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests, handling authentication and error propagation.

### 3.4. ParasutConfig

The `ParasutConfig` class holds all the necessary configuration settings for interacting with the Parasut API. These settings include:

* `parasutClientId`: Client ID for authentication.
* `parasutSecret`: Client secret for authentication.
* `redirectUri`: OAuth2.0 redirect URI.
* `parasutCompanyId`: The company ID in Parasut.
* `parasutEmail`: Email for Parasut authentication.
* `parasutPassword`: Password for Parasut authentication.
* `parasutEnv`: The target environment (e.g., `DEV`, `PRODUCTION`).
* `timeout`: Request timeout in milliseconds.

It utilizes `class-validator` to ensure that the provided configuration values are valid.

### 3.5. Module Options and Providers

The package provides interfaces and helper functions for configuring `ParasutModule` asynchronously:

* **`ParasutCredentialOptions`**: Defines the structure for Parasut API credentials.
* **`ParasutModuleOptions`**: Specifies comprehensive options for the module, including credentials, logger, performance metric options, circuit breaker options, and timeout.
* **`ParasutOptionsFactory`**: Interface for classes that will provide `ParasutModuleOptions` asynchronously.
* **`ParasutModuleAsyncOptions`**: Extends `ModuleMetadata` and defines options for asynchronous module registration, supporting `useExisting`, `useClass`, and `useFactory` patterns.
* **`createAsyncOptionsProvider` / `createAsyncProviders`**: Helper functions to set up asynchronous providers for the module's options and configuration.

### 3.6. Enums and Constants

* **`ParasutEnvironment`**: An enum defining the available environments for the Parasut API (`DEV`, `PRODUCTION`).
* **`GrantType`**: An enum defining OAuth2.0 grant types (`AUTHORIZATION_CODE`, `PASSWORD`, `REFRESH_TOKEN`).
* **`PARASUT_MODULE_OPTIONS`**: A `Symbol` used as an injection token for the module options, enabling their injection into other services.

## 4. Common Utilities

### 4.1. Custom Exceptions

The `lib/common/exceptions` directory contains a set of custom exception classes that extend a `BaseException`. These exceptions provide a standardized way to handle and communicate specific API errors within the application.

* `BaseException`
* `BadRequestException`
* `ForbiddenRequestException`
* `NotFoundException`
* `UnauthorizedException`
* `UnprocessableEntityException`

### 4.2. Circuit Breaker

The circuit breaker implementation in `lib/common/circuit-breaker` enhances the application's resilience by preventing repeated attempts to access a failing service.

* **`CircuitBreakerService`**: Implements the circuit breaker logic, managing the state transitions (CLOSED, OPEN, HALF_OPEN) based on configurable failure thresholds and reset timeouts.
* **`CircuitBreakerInterface`**: Defines the contract for the circuit breaker.
* **`CircuitBreakerEnum`**: Defines the states of the circuit breaker.

### 4.3. Performance Metrics

The `lib/common/performance-metric` component is designed for collecting and managing performance data.

* **`PerformanceMetricService`**: Responsible for collecting and storing performance metrics of various operations, aiding in monitoring and optimization efforts.
* **`PerformanceMetricOptions`**: Interface defining configuration options for the performance metric service, such as maximum metrics to store, whether to store metrics, and their time-to-live.

### 4.4. Custom Logger

* **`ParasutLoggerService`**: A custom logger service that implements NestJS's `LoggerService`. It acts as a wrapper around an underlying logger, providing consistent logging functionalities (log, error, warn, debug, verbose, fatal) and allowing for context-specific logging.

## 5. Data Transfer Objects (DTOs) and Types

The project extensively uses DTOs and custom types to define the structure of data exchanged with the Parasut API.

### 5.1. Request DTOs

Found under `lib/dto/request/` and within specific module DTO subdirectories:

* **`base.request.ts`**: A foundational DTO for requests.
* **`base-pagination.request.ts`**: Defines parameters for pagination in API requests.
* **`login.request.ts`**: Specifies the structure for authentication requests.

Module-specific request DTOs are defined within their respective `dto/request` folders (e.g., `lib/modules/contact/dto/request/create-contact.dto.ts`).

### 5.2. Response DTOs

Found under `lib/dto/response/` and within specific module DTO subdirectories:

* **`base.response.ts`**: A foundational DTO for API responses.
* **`auth.response.ts`**: Defines the structure for authentication responses, including access and refresh tokens.
* **`error.response.ts`**: Specifies the format for error responses from the API.

Module-specific response DTOs are defined within their respective `dto/response` folders (e.g., `lib/modules/contact/dto/response/contact-response.dto.ts`).

### 5.3. Common Types

Found under `lib/types/`:

* **`common.types.ts`**: Defines `EntityType`, a union type enumerating various entity names used across the Parasut API (e.g., `contacts`, `sales_invoices`, `payments`).
* **`request/`**: Contains types related to structuring API requests:
  * `base-request.types.ts`: Base types for request payloads.
  * `include.types.ts`: Types for specifying related resources to be included in a response.
  * `relationship.types.ts`: Types for defining relationships between resources within requests.
  * `request-resource.types.ts`: Types for structuring generic request resources.
* **`response/`**: Contains types related to structuring API responses:
  * `base-response.types.ts`: Base types for response payloads.
  * `include.types.ts`: Types for handling included resources in API responses.
  * `relationship.types.ts`: Types for defining relationships between resources within responses.
  * `response-resource.types.ts`: Types for structuring generic response resources.

## 6. Modules

The `parasut-nest` package is organized into several modules, each responsible for interacting with a specific part of the Parasut API.

### 6.0. Module Usage Patterns

The package supports two main usage patterns:

**Pattern 1: Import the main module (recommended for most use cases)**
```typescript
import { ParasutModule } from '@remidosol/parasut-nest';

@Module({
  imports: [
    ParasutModule.forRoot({
      credentials: { /* your credentials */ },
      // ... other options
    }),
  ],
})
export class AppModule {}
```

**Pattern 2: Import individual feature modules (for selective usage)**
```typescript
import { ParasutContactModule } from '@remidosol/parasut-nest';

@Module({
  imports: [
    ParasutContactModule, // This works because it imports ParasutCoreModule
  ],
})
export class AppModule {}
```

**Pattern 3: Import the core module directly (for advanced use cases)**
```typescript
import { ParasutCoreModule } from '@remidosol/parasut-nest';

@Module({
  imports: [
    ParasutCoreModule.forRoot({
      credentials: { /* your credentials */ },
      // ... other options
    }),
  ],
})
export class AppModule {}
```

**Note**: All feature modules now import `ParasutCoreModule` internally, ensuring they have access to the required core services (`ParasutHttpClient`, `ParasutLoggerService`, etc.). This resolves the previous dependency injection issues.

### 6.1. Contact Module

* **Module File**: `lib/modules/contact/contact.module.ts`
* **Service File**: `lib/modules/contact/contact.service.ts`
* **Purpose**: Manages interactions with Parasut's contact-related endpoints.
* **Key Functionalities**:
  * `getContacts(filter?, pagination?)`: Retrieves a list of contacts with optional filtering and pagination.
  * `createContact(payload, include?)`: Creates a new contact.
  * `getContactById(id, include?)`: Retrieves a specific contact by its ID.
  * `updateContact(id, payload, include?)`: Updates an existing contact.
  * `deleteContact(id)`: Deletes a contact by its ID.
  * `createContactCollection(id, payload, include?)`: Creates a collection (Tahsilat) transaction for a contact.
  * `createContactPayment(id, payload, include?)`: Creates a payment (Ödeme) transaction for a contact.
* **DTOs & Attributes**:
  * `contact.attr.ts`: Defines `ContactResponseAttributes`, `ContactRequestAttributes`, `ContactPersonAttributes`, `CategoryAttributes`, and their relationships.
  * `transaction.attr.ts`: Defines `TransactionRequestAttributes`, `TransactionResponseAttributes`, and their relationships for contact-related transactions.
  * `create-contact.dto.ts`, `update-contact.dto.ts`, `create-transaction.dto.ts`: Specific request DTOs.
  * `filter-request.dto.ts`, `params-request.dto.ts`: DTOs for filtering and pagination.
  * `contact-response.dto.ts`, `transaction-response.dto.ts`: Specific response DTOs.

### 6.2. Expenses Module

This module encompasses several sub-modules related to managing expenses in Parasut.

#### 6.2.1. Bank Fee Sub-module

* **Module File**: `lib/modules/expenses/bank-fee/bank-fee.module.ts`
* **Service File**: `lib/modules/expenses/bank-fee/bank-fee.service.ts`
* **Purpose**: Manages bank fee operations.
* **Key Functionalities**:
  * `createBankFee(payload, include?)`: Creates a new bank fee.
  * `getBankFeeById(id, include?)`: Retrieves a specific bank fee by its ID.
  * `updateBankFee(id, payload, include?)`: Updates an existing bank fee.
  * `deleteBankFee(id)`: Deletes a bank fee.
  * `archiveBankFee(id, include?)`: Archives a bank fee.
  * `unarchiveBankFee(id, include?)`: Unarchives a bank fee.
  * `payBankFee(id, payload)`: Records a payment for a bank fee.
* **DTOs & Attributes**:
  * `bank-fee.attr.ts`: Defines `BankFeeRequestAttributes`, `BankFeeResponseAttributes`, and their relationships with categories and tags.
  * `payment.attr.ts`: Defines `PaymentRequestAttributes`, `PaymentResponseAttributes`, and their relationships.
  * `create-bank-fee-request.dto.ts`, `update-bank-fee-request.dto.ts`, `pay-bank-fee-request.dto.ts`: Specific request DTOs.
  * `bank-fee-response.dto.ts`, `payment-response.dto.ts`: Specific response DTOs.

#### 6.2.2. Employee Sub-module

* **Module File**: `lib/modules/expenses/employee/employee.module.ts`
* **Service File**: `lib/modules/expenses/employee/employee.service.ts`
* **Purpose**: Manages employee-related data.
* **Key Functionalities**:
  * `getEmployees(filter?, pagination?)`: Retrieves a list of employees with optional filtering and pagination.
  * `createEmployee(payload, include?)`: Creates a new employee.
  * `getEmployeeById(id, include?)`: Retrieves a specific employee by ID.
  * `updateEmployee(id, payload, include?)`: Updates an existing employee.
  * `deleteEmployee(id)`: Deletes an employee.
  * `archiveEmployee(id, include?)`: Archives an employee.
  * `unarchiveEmployee(id, include?)`: Unarchives an employee.
* **DTOs & Attributes**:
  * `employee.attr.ts`: Defines `EmployeeRequestAttributes`, `EmployeeResponseAttributes`, and their relationships.
  * `create-employee-request.dto.ts`, `update-employee-request.dto.ts`: Specific request DTOs.
  * `filter-request.dto.ts`, `params-request.dto.ts`: DTOs for filtering and pagination.
  * `employee-response.dto.ts`: Specific response DTOs.

#### 6.2.3. Purchase Bill Sub-module

* **Module File**: `lib/modules/expenses/purchase-bill/purchase-bill.module.ts`
* **Service File**: `lib/modules/expenses/purchase-bill/purchase-bill.service.ts`
* **Purpose**: Manages purchase bill operations.
* **Key Functionalities**:
  * `getPurchaseBills(queryParams?)`: Retrieves a list of purchase bills with various query parameters.
  * `createBasicPurchaseBill(payload, include?)`: Creates a new basic purchase bill.
  * `createDetailedPurchaseBill(payload, include?)`: Creates a new detailed purchase bill.
  * `getPurchaseBillById(id, include?)`: Retrieves a specific purchase bill by its ID.
  * `deletePurchaseBill(id)`: Deletes a purchase bill.
  * `editBasicPurchaseBill(id, payload, include?)`: Edits an existing basic purchase bill.
  * `editDetailedPurchaseBill(id, payload, include?)`: Edits an existing detailed purchase bill.
  * `payPurchaseBill(id, payload, include?)`: Records a payment for a purchase bill.
  * `cancelPurchaseBill(id, include?)`: Cancels a purchase bill.
  * `recoverPurchaseBill(id, include?)`: Recovers an archived/cancelled purchase bill.
  * `archivePurchaseBill(id, include?)`: Archives a purchase bill.
  * `unarchivePurchaseBill(id, include?)`: Unarchives a purchase bill.
* **DTOs & Attributes**:
  * `purchase-bill.attr.ts`: Defines `PurchaseBillResponseAttributes`. Request DTOs are likely inline or generic.
  * Request DTOs are not explicitly defined in separate files for this module.
  * Response DTOs (`response.dto.ts`) are empty, suggesting generic usage or inline typing.

#### 6.2.4. Salary Sub-module

* **Module File**: `lib/modules/expenses/salary/salary.module.ts`
* **Service File**: `lib/modules/expenses/salary/salary.service.ts`
* **Purpose**: Manages salary-related operations.
* **Key Functionalities**:
  * `getSalaries(queryParams?)`: Retrieves a list of salaries with various query parameters.
  * `createSalary(payload, include?)`: Creates a new salary.
  * `getSalaryById(id, include?)`: Retrieves a specific salary by its ID.
  * `updateSalary(id, payload, include?)`: Updates an existing salary.
  * `deleteSalary(id)`: Deletes a salary.
  * `archiveSalary(id, include?)`: Archives a salary.
  * `unarchiveSalary(id, include?)`: Unarchives a salary.
  * `paySalary(id, payload, include?)`: Records a payment for a salary.
* **DTOs & Attributes**:
  * `salary.attr.ts`: Defines `SalaryAttributes`. Request DTOs are likely inline or generic.
  * Request DTOs are not explicitly defined in separate files for this module.
  * Response DTOs (`response.dto.ts`) are empty, suggesting generic usage or inline typing.

#### 6.2.5. Tax Sub-module

* **Module File**: `lib/modules/expenses/tax/tax.module.ts`
* **Service File**: `lib/modules/expenses/tax/tax.service.ts`
* **Purpose**: Manages tax operations.
* **Key Functionalities**:
  * `getTaxes(queryParams?)`: Retrieves a list of taxes with various query parameters.
  * `createTax(payload, include?)`: Creates a new tax.
  * `getTaxById(id, include?)`: Retrieves a specific tax by its ID.
  * `updateTax(id, payload, include?)`: Updates an existing tax.
  * `deleteTax(id)`: Deletes a tax.
  * `archiveTax(id, include?)`: Archives a tax.
  * `unarchiveTax(id, include?)`: Unarchives a tax.
  * `payTax(id, payload, include?)`: Records a payment for a tax.
* **DTOs & Attributes**:
  * `tax.attr.ts`: Defines `TaxAttributes`. Request DTOs are likely inline or generic.
  * Request DTOs are not explicitly defined in separate files for this module.
  * Response DTOs (`response.dto.ts`) are empty, suggesting generic usage or inline typing.

### 6.3. Formalization Module

* **Module File**: `lib/modules/formalization/formalization.module.ts`
* **Service File**: `lib/modules/formalization/formalization.service.ts`
* **Purpose**: Manages e-document related operations (e-invoice inboxes, e-archives, e-invoices, e-SMMs).
* **Key Functionalities**:
  * `getEInvoiceInboxes(queryParams?)`: Retrieves a list of e-invoice inboxes.
  * `createEArchive(payload)`: Creates a new e-archive.
  * `getEArchiveById(id, include?)`: Retrieves a specific e-archive by its ID.
  * `getEArchivePdf(id)`: Retrieves the PDF of an e-archive.
  * `createEInvoice(payload)`: Creates a new e-invoice.
  * `getEInvoiceById(id, include?)`: Retrieves a specific e-invoice by its ID.
  * `getEInvoicePdf(id)`: Retrieves the PDF of an e-invoice.
  * `createESmm(payload)`: Creates a new e-SMM (Freelance Receipt).
  * `getESmmById(id, include?)`: Retrieves a specific e-SMM by its ID.
  * `getESmmPdf(id)`: Retrieves the PDF of an e-SMM.
* **DTOs & Attributes**: DTOs for this module are likely defined inline within the service methods or are generic types. The `dto/` directory for this module is empty.

### 6.4. Sales Module

This module encompasses sub-modules related to sales operations.

#### 6.4.1. Sales Invoice Sub-module

* **Module File**: `lib/modules/sales/sales-invoice/sales-invoice.module.ts`
* **Service File**: `lib/modules/sales/sales-invoice/sales-invoice.service.ts`
* **Purpose**: Manages sales invoice operations.
* **Key Functionalities**:
  * `getSalesInvoices(queryParams?)`: Retrieves a list of sales invoices with various query parameters.
  * `createSalesInvoice(payload, include?)`: Creates a new sales invoice.
  * `getSalesInvoiceById(id, include?)`: Retrieves a specific sales invoice by its ID.
  * `updateSalesInvoice(id, payload, include?)`: Updates an existing sales invoice.
  * `deleteSalesInvoice(id)`: Deletes a sales invoice.
  * `paySalesInvoice(id, payload, include?)`: Records a payment for a sales invoice.
  * `cancelSalesInvoice(id, include?)`: Cancels a sales invoice.
  * `recoverSalesInvoice(id, include?)`: Recovers a cancelled/archived sales invoice.
  * `archiveSalesInvoice(id, include?)`: Archives a sales invoice.
  * `unarchiveSalesInvoice(id, include?)`: Unarchives a sales invoice.
  * `convertEstimateToInvoice(id, payload, include?)`: Converts an estimate to an invoice.
* **DTOs & Attributes**:
  * `sales-invoice.attr.ts`: Defines `SalesInvoiceAttributes`. Request DTOs are likely inline or generic.
  * Request DTOs are not explicitly defined in separate files for this module.
  * Response DTOs (`response.dto.ts`) are empty, suggesting generic usage or inline typing.

#### 6.4.2. Sales Offer Sub-module

* **Module File**: `lib/modules/sales/sales-offer/sales-offer.module.ts`
* **Service File**: `lib/modules/sales/sales-offer/sales-offer.service.ts`
* **Purpose**: Manages sales offer operations.
* **Key Functionalities**:
  * `getSalesOffers(queryParams?)`: Retrieves a list of sales offers with various query parameters.
  * `createSalesOffer(payload, include?)`: Creates a new sales offer.
  * `getSalesOfferById(id, include?)`: Retrieves a specific sales offer by its ID.
  * `updateSalesOffer(id, payload, include?)`: Updates an existing sales offer.
  * `deleteSalesOffer(id)`: Deletes a sales offer.
  * `getSalesOfferPdf(id)`: Requests PDF generation for a sales offer.
  * `archiveSalesOffer(id)`: Archives a sales offer.
  * `unarchiveSalesOffer(id)`: Unarchives a sales offer.
  * `getSalesOfferDetails(id, queryParams?)`: Retrieves the details (line items) of a sales offer.
  * `updateSalesOfferStatus(id, attributesPayload, include?)`: Updates the status of a sales offer.
  * `shareSalesOfferByEmail(sharingPayload, include?)`: Shares a sales offer via email.
* **DTOs & Attributes**:
  * `sales-offer.attr.ts`: Defines `SalesOfferAttributes`. Request DTOs are likely inline or generic.
  * Request DTOs are not explicitly defined in separate files for this module.
  * Response DTOs (`response.dto.ts`) are empty, suggesting generic usage or inline typing.

### 6.5. Settings Module

This module encompasses sub-modules related to managing settings in Parasut.

#### 6.5.1. Category Sub-module

* **Module File**: `lib/modules/settings/category/category.module.ts`
* **Service File**: `lib/modules/settings/category/category.service.ts`
* **Purpose**: Manages item categories.
* **Key Functionalities**:
  * `getItemCategories(queryParams?)`: Retrieves a list of item categories with various query parameters.
  * `createItemCategory(payload, include?)`: Creates a new item category.
  * `getItemCategoryById(id, include?)`: Retrieves a specific item category by its ID.
  * `updateItemCategory(id, payload, include?)`: Updates an existing item category.
  * `deleteItemCategory(id)`: Deletes an item category.
* **DTOs & Attributes**:
  * `category.attr.ts`: Defines `CategoryAttributes` and their relationships. Request DTOs are likely inline or generic.
  * Request DTOs are not explicitly defined in separate files for this module.
  * `response.dto.ts`: Defines `CategoryResponse` for single category responses and `CategoryArrayResponse` for a collection of categories.

#### 6.5.2. Tag Sub-module

* **Module File**: `lib/modules/settings/tag/tag.module.ts`
* **Service File**: `lib/modules/settings/tag/tag.service.ts`
* **Purpose**: Manages tags.
* **Key Functionalities**:
  * `getTags(queryParams?)`: Retrieves a list of tags with optional sorting and pagination.
  * `createTag(payload)`: Creates a new tag.
  * `getTagById(id)`: Retrieves a specific tag by its ID.
  * `updateTag(id, payload)`: Updates an existing tag.
  * `deleteTag(id)`: Deletes a tag.
* **DTOs & Attributes**:
  * `tag.attr.ts`: Defines `TagAttributes` and their relationships. Request DTOs are likely inline or generic.
  * Request DTOs are not explicitly defined in separate files for this module.
  * `response.dto.ts`: Defines `TagResponse` for single tag responses and `TagArrayResponse` for a collection of tags.
