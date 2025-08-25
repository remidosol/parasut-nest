# Tax Module

The `ParasutTaxModule` provides functionality for managing tax records in the Parasut system, including creating, reading, updating, deleting, archiving, unarchiving, and paying taxes.

## Installation

```typescript
import { ParasutTaxModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutTaxModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutTaxService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly taxService: ParasutTaxService) {}
}
```

### Basic Operations

#### Get All Taxes

```typescript
// Get all taxes
const taxes = await this.taxService.getTaxes();

// With query parameters
const filteredTaxes = await this.taxService.getTaxes({
  tax_type: 'vat',
  period: '2024-01',
  status: 'pending'
});
```

#### Get Tax by ID

```typescript
const tax = await this.taxService.getTaxById('123', [
  'category',
  'tags'
]);
```

#### Create Tax

```typescript
const newTax = await this.taxService.createTax({
  data: {
    type: 'taxes',
    attributes: {
      description: 'VAT for January 2024',
      issue_date: new Date('2024-01-01'),
      due_date: new Date('2024-01-31'),
      net_total: 1000
    },
    relationships: {
      category: {
        data: {
          type: 'item_categories',
          id: 'category_id'
        }
      },
      tags: {
        data: [
          {
            type: 'tags',
            id: 'tag_id'
          }
        ]
      }
    }
  }
}, ['category', 'tags']);
```

#### Update Tax

```typescript
const updatedTax = await this.taxService.updateTax('123', {
  data: {
    type: 'taxes',
    id: '123',
    attributes: {
      net_total: 1200,
      description: 'Updated VAT for January 2024'
    }
  }
}, ['category']);
```

#### Delete Tax

```typescript
await this.taxService.deleteTax('123');
```

### Archive Operations

#### Archive Tax

```typescript
const archivedTax = await this.taxService.archiveTax('123', [
  'category'
]);
```

#### Unarchive Tax

```typescript
const unarchivedTax = await this.taxService.unarchiveTax('123', [
  'category'
]);
```

### Payment Operations

#### Pay Tax

```typescript
const payment = await this.taxService.payTax('123', {
  data: {
    type: 'payments',
    attributes: {
      description: 'Tax payment for January 2024',
      issue_date: new Date('2024-01-31'),
      exchange_rate: 1,
      net_total: 1000
    },
    relationships: {
      payable: {
        data: {
          type: 'taxes',
          id: '123'
        }
      }
    }
  }
}, ['payable']);
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getTaxes(queryParams?)` | Retrieve taxes with optional query parameters | `queryParams`: object |
| `getTaxById(id, include?)` | Get a specific tax by ID | `id`: string, `include`: string[] |
| `createTax(payload, include?)` | Create a new tax record | `payload`: CreateTaxRequest, `include`: string[] |
| `updateTax(id, payload, include?)` | Update an existing tax | `id`: string, `payload`: UpdateTaxRequest, `include`: string[] |
| `deleteTax(id)` | Delete a tax | `id`: string |
| `archiveTax(id, include?)` | Archive a tax | `id`: string, `include`: string[] |
| `unarchiveTax(id, include?)` | Unarchive a tax | `id`: string, `include`: string[] |
| `payTax(id, payload, include?)` | Record a payment for a tax | `id`: string, `payload`: PayTaxRequest, `include`: string[] |

### Query Parameters

- `tax_type`: Type of tax (vat, income_tax, corporate_tax, etc.)
- `period`: Tax period (YYYY-MM format)
- `status`: Tax status (draft, pending, paid, archived)
- `date_from`: Start date for filtering
- `date_to`: End date for filtering
- `amount_from`: Minimum amount
- `amount_to`: Maximum amount
- `currency`: Currency code

### Include Options

- `category`: Include category information
- `tags`: Include associated tags
- `payments`: Include payment information

### Tax Attributes

- `description`: Tax description
- `issue_date`: Issue date
- `due_date`: Due date
- `net_total`: Net total amount

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
