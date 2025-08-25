# Salary Module

The `ParasutSalaryModule` provides functionality for managing salary records in the Parasut system, including creating, reading, updating, deleting, archiving, unarchiving, and paying salaries.

## Installation

```typescript
import { ParasutSalaryModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutSalaryModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutSalaryService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly salaryService: ParasutSalaryService) {}
}
```

### Basic Operations

#### Get All Salaries

```typescript
// Get all salaries
const salaries = await this.salaryService.getSalaries();

// With query parameters
const filteredSalaries = await this.salaryService.getSalaries({
  employee_id: '123',
  month: '2024-01',
  status: 'paid'
});
```

#### Get Salary by ID

```typescript
const salary = await this.salaryService.getSalaryById('123', [
  'employee',
  'category'
]);
```

#### Create Salary

```typescript
const newSalary = await this.salaryService.createSalary({
  data: {
    type: 'salaries',
    attributes: {
      description: 'January 2024 salary',
      currency: 'TRL',
      issue_date: new Date('2024-01-01'),
      due_date: new Date('2024-01-31'),
      exchange_rate: 1,
      net_total: 5000
    },
    relationships: {
      employee: {
        data: {
          type: 'employees',
          id: 'employee_id'
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
}, ['employee', 'category']);
```

#### Update Salary

```typescript
const updatedSalary = await this.salaryService.updateSalary('123', {
  data: {
    type: 'salaries',
    id: '123',
    attributes: {
      net_total: 5500,
      description: 'Updated January 2024 salary'
    }
  }
}, ['employee', 'category']);
```

#### Delete Salary

```typescript
await this.salaryService.deleteSalary('123');
```

### Archive Operations

#### Archive Salary

```typescript
const archivedSalary = await this.salaryService.archiveSalary('123', [
  'employee',
  'category'
]);
```

#### Unarchive Salary

```typescript
const unarchivedSalary = await this.salaryService.unarchiveSalary('123', [
  'employee',
  'category'
]);
```

### Payment Operations

#### Pay Salary

```typescript
const payment = await this.salaryService.paySalary('123', {
  data: {
    type: 'payments',
    attributes: {
      description: 'Salary payment for January 2024',
      currency: 'TRL',
      issue_date: new Date('2024-01-31'),
      exchange_rate: 1,
      net_total: 5000
    },
    relationships: {
      payable: {
        data: {
          type: 'salaries',
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
| `getSalaries(queryParams?)` | Retrieve salaries with optional query parameters | `queryParams`: object |
| `getSalaryById(id, include?)` | Get a specific salary by ID | `id`: string, `include`: string[] |
| `createSalary(payload, include?)` | Create a new salary record | `payload`: CreateSalaryRequest, `include`: string[] |
| `updateSalary(id, payload, include?)` | Update an existing salary | `id`: string, `payload`: UpdateSalaryRequest, `include`: string[] |
| `deleteSalary(id)` | Delete a salary | `id`: string |
| `archiveSalary(id, include?)` | Archive a salary | `id`: string, `include`: string[] |
| `unarchiveSalary(id, include?)` | Unarchive a salary | `id`: string, `include`: string[] |
| `paySalary(id, payload, include?)` | Record a payment for a salary | `id`: string, `payload`: PaySalaryRequest, `include`: string[] |

### Query Parameters

- `employee_id`: Employee ID
- `month`: Salary month (YYYY-MM format)
- `status`: Salary status (draft, pending, paid, archived)
- `date_from`: Start date for filtering
- `date_to`: End date for filtering
- `amount_from`: Minimum amount
- `amount_to`: Maximum amount
- `currency`: Currency code

### Include Options

- `employee`: Include employee information
- `category`: Include category information
- `tags`: Include associated tags
- `payments`: Include payment information

### Salary Attributes

- `description`: Salary description
- `currency`: Currency code (e.g., 'TRL', 'USD', 'EUR', 'GBP')
- `issue_date`: Issue date
- `due_date`: Due date
- `exchange_rate`: Exchange rate
- `net_total`: Net total amount


## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
