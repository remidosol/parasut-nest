# Purchase Bill Module

The `ParasutPurchaseBillModule` provides comprehensive functionality for managing purchase bills in the Parasut system, including creating, editing, deleting, paying, canceling, recovering, and archiving purchase bills.

## Installation

```typescript
import { ParasutPurchaseBillModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutPurchaseBillModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutPurchaseBillService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly purchaseBillService: ParasutPurchaseBillService) {}
}
```

### Basic Operations

#### Get All Purchase Bills

```typescript
// Get all purchase bills
const purchaseBills = await this.purchaseBillService.getPurchaseBills();

// With query parameters
const filteredBills = await this.purchaseBillService.getPurchaseBills({
  supplier_id: '123',
  status: 'paid',
  date_from: '2024-01-01',
  date_to: '2024-01-31'
});
```

#### Get Purchase Bill by ID

```typescript
const purchaseBill = await this.purchaseBillService.getPurchaseBillById('123', [
  'supplier',
  'category',
  'tags'
]);
```

#### Create Basic Purchase Bill

```typescript
const basicBill = await this.purchaseBillService.createBasicPurchaseBill({
  data: {
    type: 'purchase_bills',
    attributes: {
      description: 'Office supplies purchase',
      issue_date: new Date('2024-01-15'),
      due_date: new Date('2024-01-31'),
      currency: 'TRL',
      exchange_rate: 1,
      net_total: 1000,
      withholding_rate: 0,
      invoice_discount_type: 'percentage',
      invoice_discount: 0
    },
    relationships: {
      supplier: {
        data: {
          type: 'contacts',
          id: 'supplier_id'
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
}, ['supplier', 'category']);
```

#### Create Detailed Purchase Bill

```typescript
const detailedBill = await this.purchaseBillService.createDetailedPurchaseBill({
  data: {
    type: 'purchase_bills',
    attributes: {
      description: 'Detailed equipment purchase',
      issue_date: new Date('2024-01-15'),
      due_date: new Date('2024-01-31'),
      currency: 'TRL',
      exchange_rate: 1,
      net_total: 2000,
      withholding_rate: 0,
      invoice_discount_type: 'percentage',
      invoice_discount: 0
    },
    relationships: {
      supplier: {
        data: {
          type: 'contacts',
          id: 'supplier_id'
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
}, ['supplier', 'category']);
```

#### Edit Purchase Bill

```typescript
// Edit basic purchase bill
const updatedBasicBill = await this.purchaseBillService.editBasicPurchaseBill('123', {
  data: {
    type: 'purchase_bills',
    id: '123',
    attributes: {
      net_total: 1200,
      description: 'Updated office supplies purchase'
    }
  }
}, ['supplier', 'category']);

// Edit detailed purchase bill
const updatedDetailedBill = await this.purchaseBillService.editDetailedPurchaseBill('123', {
  data: {
    type: 'purchase_bills',
    id: '123',
    attributes: {
      net_total: 2200,
      description: 'Updated equipment purchase'
    }
  }
}, ['supplier', 'category']);
```

#### Delete Purchase Bill

```typescript
await this.purchaseBillService.deletePurchaseBill('123');
```

### Payment Operations

#### Pay Purchase Bill

```typescript
const payment = await this.purchaseBillService.payPurchaseBill('123', {
  data: {
    type: 'payments',
    attributes: {
      amount: 1000,
      currency: 'TRY',
      exchange_rate: 1,
      notes: 'Purchase bill payment'
    },
    relationships: {
      purchase_bill: {
        data: {
          type: 'purchase_bills',
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
}, ['supplier', 'category']);
```

### Status Operations

#### Cancel Purchase Bill

```typescript
const cancelledBill = await this.purchaseBillService.cancelPurchaseBill('123', [
  'supplier',
  'category'
]);
```

#### Recover Purchase Bill

```typescript
const recoveredBill = await this.purchaseBillService.recoverPurchaseBill('123', [
  'supplier',
  'category'
]);
```

#### Archive Purchase Bill

```typescript
const archivedBill = await this.purchaseBillService.archivePurchaseBill('123', [
  'supplier',
  'category'
]);
```

#### Unarchive Purchase Bill

```typescript
const unarchivedBill = await this.purchaseBillService.unarchivePurchaseBill('123', [
  'supplier',
  'category'
]);
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getPurchaseBills(queryParams?)` | Retrieve purchase bills with optional query parameters | `queryParams`: object |
| `getPurchaseBillById(id, include?)` | Get a specific purchase bill by ID | `id`: string, `include`: string[] |
| `createBasicPurchaseBill(payload, include?)` | Create a new basic purchase bill | `payload`: CreatePurchaseBillRequest, `include`: string[] |
| `createDetailedPurchaseBill(payload, include?)` | Create a new detailed purchase bill | `payload`: CreatePurchaseBillRequest, `include`: string[] |
| `editBasicPurchaseBill(id, payload, include?)` | Edit an existing basic purchase bill | `id`: string, `payload`: UpdatePurchaseBillRequest, `include`: string[] |
| `editDetailedPurchaseBill(id, payload, include?)` | Edit an existing detailed purchase bill | `id`: string, `payload`: UpdatePurchaseBillRequest, `include`: string[] |
| `deletePurchaseBill(id)` | Delete a purchase bill | `id`: string |
| `payPurchaseBill(id, payload, include?)` | Record a payment for a purchase bill | `id`: string, `payload`: PayPurchaseBillRequest, `include`: string[] |
| `cancelPurchaseBill(id, include?)` | Cancel a purchase bill | `id`: string, `include`: string[] |
| `recoverPurchaseBill(id, include?)` | Recover a cancelled/archived purchase bill | `id`: string, `include`: string[] |
| `archivePurchaseBill(id, include?)` | Archive a purchase bill | `id`: string, `include`: string[] |
| `unarchivePurchaseBill(id, include?)` | Unarchive a purchase bill | `id`: string, `include`: string[] |

### Query Parameters

- `supplier_id`: Supplier contact ID
- `status`: Bill status (draft, pending, paid, cancelled, archived)
- `date_from`: Start date for filtering
- `date_to`: End date for filtering
- `amount_from`: Minimum amount
- `amount_to`: Maximum amount
- `currency`: Currency code

### Include Options

- `supplier`: Include supplier information
- `category`: Include category information
- `tags`: Include associated tags
- `payments`: Include payment information

### Purchase Bill Attributes

- `description`: Bill description
- `issue_date`: Issue date
- `due_date`: Due date
- `currency`: Currency code (e.g., 'TRL', 'USD', 'EUR', 'GBP')
- `exchange_rate`: Exchange rate
- `net_total`: Net total amount
- `withholding_rate`: Withholding tax rate
- `invoice_discount_type`: Invoice discount type
- `invoice_discount`: Invoice discount amount

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
