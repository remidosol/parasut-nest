# Bank Fee Module

The `ParasutBankFeeModule` provides functionality for managing bank fees in the Parasut system, including creating, updating, deleting, archiving, and paying bank fees.

## Installation

```typescript
import { ParasutBankFeeModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutBankFeeModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutBankFeeService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly bankFeeService: ParasutBankFeeService) {}
}
```

### Basic Operations

#### Create Bank Fee

```typescript
const bankFee = await this.bankFeeService.createBankFee({
  data: {
    type: 'bank_fees',
    attributes: {
      description: 'Monthly bank fee',
      currency: 'TRL',
      issue_date: new Date('2024-01-15'),
      due_date: new Date('2024-01-31'),
      exchange_rate: 1,
      net_total: 100
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

#### Get Bank Fee by ID

```typescript
const bankFee = await this.bankFeeService.getBankFeeById('123', [
  'category',
  'tags'
]);
```

#### Update Bank Fee

```typescript
const updatedBankFee = await this.bankFeeService.updateBankFee('123', {
  data: {
    type: 'bank_fees',
    id: '123',
    attributes: {
      net_total: 150,
      description: 'Updated monthly bank fee'
    }
  }
}, ['category']);
```

#### Delete Bank Fee

```typescript
await this.bankFeeService.deleteBankFee('123');
```

### Archive Operations

#### Archive Bank Fee

```typescript
const archivedBankFee = await this.bankFeeService.archiveBankFee('123', [
  'category'
]);
```

#### Unarchive Bank Fee

```typescript
const unarchivedBankFee = await this.bankFeeService.unarchiveBankFee('123', [
  'category'
]);
```

### Payment Operations

#### Pay Bank Fee

```typescript
const payment = await this.bankFeeService.payBankFee('123', {
  data: {
    type: 'payments',
    attributes: {
      amount: 100,
      currency: 'TRY',
      exchange_rate: 1,
      notes: 'Bank fee payment'
    },
    relationships: {
      bank_fee: {
        data: {
          type: 'bank_fees',
          id: '123'
        }
      },
      account: {
        data: {
          type: 'accounts',
          id: 'account_id'
        }
      }
    }
  }
});
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `createBankFee(payload, include?)` | Create a new bank fee | `payload`: CreateBankFeeRequest, `include`: string[] |
| `getBankFeeById(id, include?)` | Get a specific bank fee by ID | `id`: string, `include`: string[] |
| `updateBankFee(id, payload, include?)` | Update an existing bank fee | `id`: string, `payload`: UpdateBankFeeRequest, `include`: string[] |
| `deleteBankFee(id)` | Delete a bank fee | `id`: string |
| `archiveBankFee(id, include?)` | Archive a bank fee | `id`: string, `include`: string[] |
| `unarchiveBankFee(id, include?)` | Unarchive a bank fee | `id`: string, `include`: string[] |
| `payBankFee(id, payload)` | Record a payment for a bank fee | `id`: string, `payload`: PayBankFeeRequest |

### Bank Fee Attributes

- `description`: Fee description
- `currency`: Currency code (e.g., 'TRL', 'USD', 'EUR', 'GBP')
- `issue_date`: Issue date
- `due_date`: Due date
- `exchange_rate`: Exchange rate
- `net_total`: Net total amount

### Include Options

- `category`: Include category information
- `tags`: Include associated tags
- `payments`: Include payment information

### Payment Attributes

- `amount`: Payment amount
- `currency`: Payment currency
- `exchange_rate`: Exchange rate
- `notes`: Payment notes

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
