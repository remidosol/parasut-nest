# Employee Module

The `ParasutEmployeeModule` provides functionality for managing employee data in the Parasut system, including creating, reading, updating, deleting, archiving, and unarchiving employees.

## Installation

```typescript
import { ParasutEmployeeModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutEmployeeModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutEmployeeService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly employeeService: ParasutEmployeeService) {}
}
```

### Basic Operations

#### Get All Employees

```typescript
// Get all employees
const employees = await this.employeeService.getEmployees();

// With filtering
const filteredEmployees = await this.employeeService.getEmployees({
  name: 'John Doe',
  email: 'john@company.com'
});

// With pagination
const paginatedEmployees = await this.employeeService.getEmployees(
  { department: 'IT' },
  { page: 1, per_page: 20 }
);
```

#### Get Employee by ID

```typescript
const employee = await this.employeeService.getEmployeeById('123', [
  'department',
  'position'
]);
```

#### Create Employee

```typescript
const newEmployee = await this.employeeService.createEmployee({
  data: {
    type: 'employees',
    attributes: {
      name: 'Jane Smith',
      email: 'jane@company.com',
      iban: 'TR123456789012345678901234'
    },
    relationships: {
      category: {
        data: {
          type: 'item_categories',
          id: 'dept_category_id'
        }
      }
    }
  }
}, ['category']);
```

#### Update Employee

```typescript
const updatedEmployee = await this.employeeService.updateEmployee('123', {
  data: {
    type: 'employees',
    id: '123',
    attributes: {
      email: 'jane.smith@company.com',
      iban: 'TR123456789012345678901235'
    }
  }
}, ['category']);
```

#### Delete Employee

```typescript
await this.employeeService.deleteEmployee('123');
```

### Archive Operations

#### Archive Employee

```typescript
const archivedEmployee = await this.employeeService.archiveEmployee('123', [
  'department'
]);
```

#### Unarchive Employee

```typescript
const unarchivedEmployee = await this.employeeService.unarchiveEmployee('123', [
  'department'
]);
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getEmployees(filter?, pagination?)` | Retrieve employees with optional filtering and pagination | `filter`: EmployeeFilterParams, `pagination`: EmployeePaginationParams |
| `getEmployeeById(id, include?)` | Get a specific employee by ID | `id`: string, `include`: string[] |
| `createEmployee(payload, include?)` | Create a new employee | `payload`: CreateEmployeeRequest, `include`: string[] |
| `updateEmployee(id, payload, include?)` | Update an existing employee | `id`: string, `payload`: UpdateEmployeeRequest, `include`: string[] |
| `deleteEmployee(id)` | Delete an employee | `id`: string |
| `archiveEmployee(id, include?)` | Archive an employee | `id`: string, `include`: string[] |
| `unarchiveEmployee(id, include?)` | Unarchive an employee | `id`: string, `include`: string[] |

### Filter Parameters

- `name`: Employee name
- `email`: Employee email

### Pagination Parameters

- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 25, max: 100)

### Include Options

- `category`: Include category information
- `managed_by_user`: Include manager information
- `managed_by_user_role`: Include manager role information

### Employee Attributes

- `name`: Employee full name
- `email`: Employee email address
- `archived`: Archive status
- `iban`: Employee IBAN

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
