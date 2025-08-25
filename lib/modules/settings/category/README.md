# Category Module

The `ParasutCategoryModule` provides functionality for managing item categories in the Parasut system, including creating, reading, updating, and deleting categories.

## Installation

```typescript
import { ParasutCategoryModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutCategoryModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutCategoryService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly categoryService: ParasutCategoryService) {}
}
```

### Basic Operations

#### Get All Item Categories

```typescript
// Get all item categories
const categories = await this.categoryService.getItemCategories();

// With query parameters
const filteredCategories = await this.categoryService.getItemCategories({
  name: 'Office Supplies',
  parent_id: 'parent_category_id'
});
```

#### Get Item Category by ID

```typescript
const category = await this.categoryService.getItemCategoryById('123', [
  'parent',
  'children'
]);
```

#### Create Item Category

```typescript
const newCategory = await this.categoryService.createItemCategory({
  data: {
    type: 'item_categories',
    attributes: {
      name: 'Software Licenses',
      bg_color: '#FF5733',
      text_color: '#FFFFFF',
      category_type: 'item'
    },
    relationships: {
      parent: {
        data: {
          type: 'item_categories',
          id: 'parent_category_id'
        }
      }
    }
  }
}, ['parent']);
```

#### Update Item Category

```typescript
const updatedCategory = await this.categoryService.updateItemCategory('123', {
  data: {
    type: 'item_categories',
    id: '123',
    attributes: {
      name: 'Software & Licenses',
      bg_color: '#FF5733',
      text_color: '#FFFFFF'
    }
  }
}, ['parent']);
```

#### Delete Item Category

```typescript
await this.categoryService.deleteItemCategory('123');
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getItemCategories(queryParams?)` | Retrieve item categories with optional query parameters | `queryParams`: object |
| `getItemCategoryById(id, include?)` | Get a specific item category by ID | `id`: string, `include`: string[] |
| `createItemCategory(payload, include?)` | Create a new item category | `payload`: CreateCategoryRequest, `include`: string[] |
| `updateItemCategory(id, payload, include?)` | Update an existing item category | `id`: string, `payload`: UpdateCategoryRequest, `include`: string[] |
| `deleteItemCategory(id)` | Delete an item category | `id`: string |

### Query Parameters

- `name`: Category name
- `parent_id`: Parent category ID
- `description`: Category description
- `color`: Category color

### Include Options

- `parent`: Include parent category information
- `children`: Include child categories
- `tags`: Include associated tags

### Category Attributes

- `name`: Category name
- `bg_color`: Background color (hex code)
- `text_color`: Text color (hex code)
- `category_type`: Category type
- `parent_id`: Parent category ID (optional)
- `full_path`: Full category path

### Response Types

- `CategoryResponse`: Single category response
- `CategoryArrayResponse`: Collection of categories response

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
