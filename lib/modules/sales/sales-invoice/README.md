# Sales Invoice Module

The `ParasutSalesInvoiceModule` provides comprehensive functionality for managing sales invoices in the Parasut system, including creating, reading, updating, deleting, paying, canceling, recovering, and archiving sales invoices.

## Installation

```typescript
import { ParasutSalesInvoiceModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutSalesInvoiceModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutSalesInvoiceService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly salesInvoiceService: ParasutSalesInvoiceService) {}
}
```

### Basic Operations

#### Get All Sales Invoices

```typescript
// Get all sales invoices
const salesInvoices = await this.salesInvoiceService.getSalesInvoices();

// With query parameters
const filteredInvoices = await this.salesInvoiceService.getSalesInvoices({
  contact_id: '123',
  status: 'paid',
  date_from: '2024-01-01',
  date_to: '2024-01-31'
});
```

#### Get Sales Invoice by ID

```typescript
const salesInvoice = await this.salesInvoiceService.getSalesInvoiceById('123', [
  'contact',
  'category',
  'tags'
]);
```

#### Create Sales Invoice

```typescript
const newInvoice = await this.salesInvoiceService.createSalesInvoice({
  data: {
    type: 'sales_invoices',
    attributes: {
      description: 'Software license invoice',
      issue_date: new Date('2024-01-15'),
      due_date: new Date('2024-01-31'),
      currency: 'TRL',
      exchange_rate: 1,
      invoice_series: 'A',
      invoice_id: 1,
      billing_address: 'Sample Address',
      city: 'Istanbul',
      country: 'Turkey'
    },
    relationships: {
      contact: {
        data: {
          type: 'contacts',
          id: 'contact_id'
        }
      },
      category: {
        data: {
          type: 'item_categories',
          id: 'category_id'
        }
      }
    }
  }
}, ['contact', 'category']);
```

#### Update Sales Invoice

```typescript
const updatedInvoice = await this.salesInvoiceService.updateSalesInvoice('123', {
  data: {
    type: 'sales_invoices',
    id: '123',
    attributes: {
      description: 'Updated software license invoice',
      due_date: new Date('2024-02-15')
    }
  }
}, ['contact', 'category']);
```

#### Delete Sales Invoice

```typescript
await this.salesInvoiceService.deleteSalesInvoice('123');
```

### Payment Operations

#### Pay Sales Invoice

```typescript
const payment = await this.salesInvoiceService.paySalesInvoice('123', {
  data: {
    type: 'payments',
    attributes: {
      description: 'Invoice payment for software license',
      issue_date: new Date('2024-01-31'),
      exchange_rate: 1,
      net_total: 1000
    },
    relationships: {
      payable: {
        data: {
          type: 'sales_invoices',
          id: '123'
        }
      }
    }
  }
}, ['payable']);
```

### Status Operations

#### Cancel Sales Invoice

```typescript
const cancelledInvoice = await this.salesInvoiceService.cancelSalesInvoice('123', [
  'contact',
  'category'
]);
```

#### Recover Sales Invoice

```typescript
const recoveredInvoice = await this.salesInvoiceService.recoverSalesInvoice('123', [
  'contact',
  'category'
]);
```

#### Archive Sales Invoice

```typescript
const archivedInvoice = await this.salesInvoiceService.archiveSalesInvoice('123', [
  'contact',
  'category'
]);
```

#### Unarchive Sales Invoice

```typescript
const unarchivedInvoice = await this.salesInvoiceService.unarchiveSalesInvoice('123', [
  'contact',
  'category'
]);
```

### Conversion Operations

#### Convert Estimate to Invoice

```typescript
const convertedInvoice = await this.salesInvoiceService.convertEstimateToInvoice('123', {
  data: {
    type: 'sales_invoices',
    attributes: {
      notes: 'Converted from estimate'
    }
  }
}, ['contact', 'category']);
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getSalesInvoices(queryParams?)` | Retrieve sales invoices with optional query parameters | `queryParams`: object |
| `getSalesInvoiceById(id, include?)` | Get a specific sales invoice by ID | `id`: string, `include`: string[] |
| `createSalesInvoice(payload, include?)` | Create a new sales invoice | `payload`: CreateSalesInvoiceRequest, `include`: string[] |
| `updateSalesInvoice(id, payload, include?)` | Update an existing sales invoice | `id`: string, `payload`: UpdateSalesInvoiceRequest, `include`: string[] |
| `deleteSalesInvoice(id)` | Delete a sales invoice | `id`: string |
| `paySalesInvoice(id, payload, include?)` | Record a payment for a sales invoice | `id`: string, `payload`: PaySalesInvoiceRequest, `include`: string[] |
| `cancelSalesInvoice(id, include?)` | Cancel a sales invoice | `id`: string, `include`: string[] |
| `recoverSalesInvoice(id, include?)` | Recover a cancelled/archived sales invoice | `id`: string, `include`: string[] |
| `archiveSalesInvoice(id, include?)` | Archive a sales invoice | `id`: string, `include`: string[] |
| `unarchiveSalesInvoice(id, include?)` | Unarchive a sales invoice | `id`: string, `include`: string[] |
| `convertEstimateToInvoice(id, payload, include?)` | Convert an estimate to an invoice | `id`: string, `payload`: ConvertEstimateRequest, `include`: string[] |

### Query Parameters

- `contact_id`: Customer contact ID
- `status`: Invoice status (draft, pending, paid, cancelled, archived)
- `date_from`: Start date for filtering
- `date_to`: End date for filtering
- `amount_from`: Minimum amount
- `amount_to`: Maximum amount
- `currency`: Currency code

### Include Options

- `contact`: Include customer information
- `category`: Include category information
- `tags`: Include associated tags
- `payments`: Include payment information

### Sales Invoice Attributes

- `description`: Invoice description
- `issue_date`: Issue date
- `due_date`: Due date
- `currency`: Currency code (e.g., 'TRL', 'USD', 'EUR', 'GBP')
- `exchange_rate`: Exchange rate
- `invoice_series`: Invoice series identifier
- `invoice_id`: Invoice ID number
- `billing_address`: Billing address
- `city`: City
- `country`: Country
- `tax_office`: Tax office
- `tax_number`: Tax number
- `order_no`: Order number
- `order_date`: Order date

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
