# Sales Offer Module

The `ParasutSalesOfferModule` provides comprehensive functionality for managing sales offers in the Parasut system, including creating, reading, updating, deleting, archiving, unarchiving, and sharing sales offers.

## Installation

```typescript
import { ParasutSalesOfferModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutSalesOfferModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutSalesOfferService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly salesOfferService: ParasutSalesOfferService) {}
}
```

### Basic Operations

#### Get All Sales Offers

```typescript
// Get all sales offers
const salesOffers = await this.salesOfferService.getSalesOffers();

// With query parameters
const filteredOffers = await this.salesOfferService.getSalesOffers({
  contact_id: '123',
  status: 'pending',
  date_from: '2024-01-01',
  date_to: '2024-01-31'
});
```

#### Get Sales Offer by ID

```typescript
const salesOffer = await this.salesOfferService.getSalesOfferById('123', [
  'contact',
  'category',
  'tags'
]);
```

#### Create Sales Offer

```typescript
const newOffer = await this.salesOfferService.createSalesOffer({
  data: {
    type: 'sales_offers',
    attributes: {
      description: 'Software development offer',
      issue_date: new Date('2024-01-15'),
      due_date: new Date('2024-02-15'),
      currency: 'TRL',
      exchange_rate: 1,
      billing_address: 'Sample Address',
      city: 'Istanbul',
      country: 'Turkey',
      order_no: 'ORD-001',
      order_date: new Date('2024-01-10')
    },
    relationships: {
      contact: {
        data: {
          type: 'contacts',
          id: 'contact_id'
        }
      }
    }
  }
}, ['contact']);
```

#### Update Sales Offer

```typescript
const updatedOffer = await this.salesOfferService.updateSalesOffer('123', {
  data: {
    type: 'sales_offers',
    id: '123',
    attributes: {
      description: 'Updated software development offer',
      due_date: new Date('2024-03-15')
    }
  }
}, ['contact'];
```

#### Delete Sales Offer

```typescript
await this.salesOfferService.deleteSalesOffer('123');
```

### PDF Operations

#### Get Sales Offer PDF

```typescript
const pdfBuffer = await this.salesOfferService.getSalesOfferPdf('123');
```

### Status Operations

#### Archive Sales Offer

```typescript
const archivedOffer = await this.salesOfferService.archiveSalesOffer('123');
```

#### Unarchive Sales Offer

```typescript
const unarchivedOffer = await this.salesOfferService.unarchiveSalesOffer('123');
```

### Detail Operations

#### Get Sales Offer Details

```typescript
const offerDetails = await this.salesOfferService.getSalesOfferDetails('123', {
  include_line_items: true
});
```

#### Update Sales Offer Status

```typescript
const updatedStatus = await this.salesOfferService.updateSalesOfferStatus('123', {
  status: 'accepted',
  notes: 'Offer accepted by customer'
}, ['contact', 'category']);
```

### Sharing Operations

#### Share Sales Offer by Email

```typescript
const sharingResult = await this.salesOfferService.shareSalesOfferByEmail({
  data: {
    type: 'sales_offer_sharings',
    attributes: {
      email: 'customer@example.com',
      subject: 'Your Sales Offer',
      message: 'Please find attached your sales offer.',
      include_pdf: true
    },
    relationships: {
      sales_offer: {
        data: {
          type: 'sales_offers',
          id: '123'
        }
      }
    }
  }
}, ['contact']);
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getSalesOffers(queryParams?)` | Retrieve sales offers with optional query parameters | `queryParams`: object |
| `getSalesOfferById(id, include?)` | Get a specific sales offer by ID | `id`: string, `include`: string[] |
| `createSalesOffer(payload, include?)` | Create a new sales offer | `payload`: CreateSalesOfferRequest, `include`: string[] |
| `updateSalesOffer(id, payload, include?)` | Update an existing sales offer | `id`: string, `payload`: UpdateSalesOfferRequest, `include`: string[] |
| `deleteSalesOffer(id)` | Delete a sales offer | `id`: string |
| `getSalesOfferPdf(id)` | Get the PDF of a sales offer | `id`: string |
| `archiveSalesOffer(id)` | Archive a sales offer | `id`: string |
| `unarchiveSalesOffer(id)` | Unarchive a sales offer | `id`: string |
| `getSalesOfferDetails(id, queryParams?)` | Get the details of a sales offer | `id`: string, `queryParams`: object |
| `updateSalesOfferStatus(id, attributesPayload, include?)` | Update the status of a sales offer | `id`: string, `attributesPayload`: object, `include`: string[] |
| `shareSalesOfferByEmail(sharingPayload, include?)` | Share a sales offer via email | `sharingPayload`: ShareSalesOfferRequest, `include`: string[] |

### Query Parameters

- `contact_id`: Customer contact ID
- `status`: Offer status (draft, pending, accepted, rejected, expired, archived)
- `date_from`: Start date for filtering
- `date_to`: End date for filtering
- `amount_from`: Minimum amount
- `amount_to`: Maximum amount
- `currency`: Currency code

### Include Options

- `contact`: Include customer information
- `category`: Include category information
- `tags`: Include associated tags
- `line_items`: Include line item details

### Sales Offer Attributes

- `description`: Offer description
- `issue_date`: Issue date
- `due_date`: Due date
- `currency`: Currency code (e.g., 'TRL', 'USD', 'EUR', 'GBP')
- `exchange_rate`: Exchange rate
- `billing_address`: Billing address
- `city`: City
- `district`: District
- `country`: Country
- `tax_office`: Tax office
- `tax_number`: Tax number
- `order_no`: Order number
- `order_date`: Order date
- `content`: Offer content
- `contact_type`: Contact type
- `display_exchange_rate_in_pdf`: Whether to display exchange rate in PDF

### Status Values

- `draft`: Draft offer
- `pending`: Pending customer response
- `accepted`: Accepted by customer
- `rejected`: Rejected by customer
- `expired`: Offer expired
- `archived`: Archived offer

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
