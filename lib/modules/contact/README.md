# Contact Module

The `ParasutContactModule` provides comprehensive functionality for managing contacts in the Parasut system, including creating, reading, updating, and deleting contacts, as well as managing contact-related transactions.

## Installation

```typescript
import { ParasutContactModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutContactModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutContactService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly contactService: ParasutContactService) {}
}
```

### Basic Operations

#### Get All Contacts

```typescript
// Get all contacts
const contacts = await this.contactService.getContacts();

// With filtering
const filteredContacts = await this.contactService.getContacts({
  name: 'John Doe',
  contact_type: 'person',
  account_type: 'customer'
});

// With pagination
const paginatedContacts = await this.contactService.getContacts(
  { account_type: 'customer' },
  { page: 1, per_page: 20 }
);
```

#### Get Contact by ID

```typescript
const contact = await this.contactService.getContactById('123', [
  'category',
  'contact_portal',
  'contact_people'
]);
```

#### Create Contact

```typescript
const newContact = await this.contactService.createContact({
  data: {
    type: 'contacts',
    attributes: {
      name: 'John Doe',
      account_type: 'customer',
      email: 'john@example.com',
      phone: '+1234567890',
      contact_type: 'person',
      tax_office: 'Tax Office Name',
      tax_number: '1234567890',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Sample Address'
    },
    relationships: {
      category: {
        data: {
          type: 'item_categories',
          id: 'category_id'
        }
      }
    }
  }
}, ['category', 'contact_portal']);
```

#### Update Contact

```typescript
const updatedContact = await this.contactService.updateContact('123', {
  data: {
    type: 'contacts',
    id: '123',
    attributes: {
      name: 'John Smith',
      email: 'johnsmith@example.com',
      phone: '+1234567891'
    }
  }
}, ['category']);
```

#### Delete Contact

```typescript
await this.contactService.deleteContact('123');
```

### Transaction Management

#### Create Collection (Tahsilat)

```typescript
const collection = await this.contactService.createContactCollection('123', {
  data: {
    type: 'collections',
    attributes: {
      amount: 1000,
      currency: 'TRY',
      exchange_rate: 1,
      withholding_rate: 0,
      vat_withholding_rate: 0,
      notes: 'Payment received'
    },
    relationships: {
      contact: {
        data: {
          type: 'contacts',
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

#### Create Payment (Ödeme)

```typescript
const payment = await this.contactService.createContactPayment('123', {
  data: {
    type: 'payments',
    attributes: {
      amount: 500,
      currency: 'TRY',
      exchange_rate: 1,
      notes: 'Payment made'
    },
    relationships: {
      contact: {
        data: {
          type: 'contacts',
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
| `getContacts(filter?, pagination?)` | Retrieve contacts with optional filtering and pagination | `filter`: ContactFilterParams, `pagination`: ContactPaginationParams |
| `getContactById(id, include?)` | Get a specific contact by ID | `id`: string, `include`: string[] |
| `createContact(payload, include?)` | Create a new contact | `payload`: CreateContactRequest, `include`: string[] |
| `updateContact(id, payload, include?)` | Update an existing contact | `id`: string, `payload`: UpdateContactRequest, `include`: string[] |
| `deleteContact(id)` | Delete a contact | `id`: string |
| `createContactCollection(id, payload, include?)` | Create a collection transaction | `id`: string, `payload`: CreateTransactionRequest, `include`: string[] |
| `createContactPayment(id, payload, include?)` | Create a payment transaction | `id`: string, `payload`: CreateTransactionRequest, `include`: string[] |

### Filter Parameters

- `name`: Contact name
- `contact_type`: Type of contact (`person` or `company`)
- `account_type`: Account type (`customer`, `supplier`, `employee`, etc.)
- `email`: Contact email
- `phone`: Contact phone number
- `tax_number`: Tax identification number
- `tax_office`: Tax office name

### Pagination Parameters

- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 25, max: 100)

### Include Options

- `category`: Include category information
- `contact_portal`: Include contact portal details
- `contact_people`: Include contact people
- `tags`: Include associated tags
- `addresses`: Include address information

## Error Handling

The service throws `BadRequestException` for validation errors and other Parasut API errors are properly propagated with detailed error messages.

## Examples

See the [main documentation](../../../README.md) for more comprehensive examples and the complete API reference.
