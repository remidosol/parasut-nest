# Formalization Module

The `ParasutFormalizationModule` provides comprehensive functionality for managing e-documents in the Parasut system, including e-invoice inboxes, e-archives, e-invoices, and e-SMMs (Freelance Receipts).

## Installation

```typescript
import { ParasutFormalizationModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutFormalizationModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutFormalizationService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly formalizationService: ParasutFormalizationService) {}
}
```

### E-Invoice Inbox Operations

#### Get E-Invoice Inboxes

```typescript
// Get all e-invoice inboxes
const inboxes = await this.formalizationService.getEInvoiceInboxes();

// With query parameters
const filteredInboxes = await this.formalizationService.getEInvoiceInboxes({
  status: 'pending',
  date_from: '2024-01-01',
  date_to: '2024-01-31'
});
```

### E-Archive Operations

#### Create E-Archive

```typescript
const eArchive = await this.formalizationService.createEArchive({
  data: {
    type: 'e_archives',
    attributes: {
      // E-archive specific attributes
      // Note: This module uses generic attributes
    },
    relationships: {
      sales_invoice: {
        data: {
          type: 'sales_invoices',
          id: 'sales_invoice_id'
        }
      }
    }
  }
});
```

#### Get E-Archive by ID

```typescript
const eArchive = await this.formalizationService.getEArchiveById('123', [
  'contact',
  'category'
]);
```

#### Get E-Archive PDF

```typescript
const pdfBuffer = await this.formalizationService.getEArchivePdf('123');
```

### E-Invoice Operations

#### Create E-Invoice

```typescript
const eInvoice = await this.formalizationService.createEInvoice({
  data: {
    type: 'e_invoices',
    attributes: {
      // E-invoice specific attributes
      // Note: This module uses generic attributes
    },
    relationships: {
      invoice: {
        data: {
          type: 'sales_invoices',
          id: 'sales_invoice_id'
        }
      }
    }
  }
});
```

#### Get E-Invoice by ID

```typescript
const eInvoice = await this.formalizationService.getEInvoiceById('123', [
  'contact',
  'category'
]);
```

#### Get E-Invoice PDF

```typescript
const pdfBuffer = await this.formalizationService.getEInvoicePdf('123');
```

### E-SMM Operations (Freelance Receipts)

#### Create E-SMM

```typescript
const eSmm = await this.formalizationService.createESmm({
  data: {
    type: 'e_smms',
    attributes: {
      // E-SMM specific attributes
      // Note: This module uses generic attributes
    },
    relationships: {
      sales_invoice: {
        data: {
          type: 'sales_invoices',
          id: 'sales_invoice_id'
        }
      }
    }
  }
});
```

#### Get E-SMM by ID

```typescript
const eSmm = await this.formalizationService.getESmmById('123', [
  'contact',
  'category'
]);
```

#### Get E-SMM PDF

```typescript
const pdfBuffer = await this.formalizationService.getESmmPdf('123');
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getEInvoiceInboxes(queryParams?)` | Retrieve e-invoice inboxes with optional query parameters | `queryParams`: object |
| `createEArchive(payload)` | Create a new e-archive document | `payload`: CreateEArchiveRequest |
| `getEArchiveById(id, include?)` | Get a specific e-archive by ID | `id`: string, `include`: string[] |
| `getEArchivePdf(id)` | Get the PDF of an e-archive | `id`: string |
| `createEInvoice(payload)` | Create a new e-invoice document | `payload`: CreateEInvoiceRequest |
| `getEInvoiceById(id, include?)` | Get a specific e-invoice by ID | `id`: string, `include`: string[] |
| `getEInvoicePdf(id)` | Get the PDF of an e-invoice | `id`: string |
| `createESmm(payload)` | Create a new e-SMM document | `payload`: CreateESmmRequest |
| `getESmmById(id, include?)` | Get a specific e-SMM by ID | `id`: string, `include`: string[] |
| `getESmmPdf(id)` | Get the PDF of an e-SMM | `id`: string |

### Query Parameters (E-Invoice Inboxes)

- `status`: Inbox status (pending, processed, error)
- `date_from`: Start date for filtering
- `date_to`: End date for filtering
- `vkn`: Tax identification number

### Include Options

- `contact`: Include contact information
- `category`: Include category information
- `tags`: Include associated tags

### Common Attributes

- `id`: Document ID
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `status`: Document status

**Note**: This module uses generic attributes. The actual attributes available depend on the Parasut API version and configuration.

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../README.md) for more comprehensive examples and the complete API reference.
