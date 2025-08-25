# Tag Module

The `ParasutTagModule` provides functionality for managing tags in the Parasut system, including creating, reading, updating, and deleting tags.

## Installation

```typescript
import { ParasutTagModule } from '@remidosol/parasut-nest';

@Module({
  imports: [ParasutTagModule],
  // ... other configurations
})
export class AppModule {}
```

## Usage

### Injecting the Service

```typescript
import { Injectable } from '@nestjs/common';
import { ParasutTagService } from '@remidosol/parasut-nest';

@Injectable()
export class MyService {
  constructor(private readonly tagService: ParasutTagService) {}
}
```

### Basic Operations

#### Get All Tags

```typescript
// Get all tags
const tags = await this.tagService.getTags();

// With query parameters
const filteredTags = await this.tagService.getTags({
  name: 'Important',
  sort: 'name',
  page: 1,
  per_page: 20
});
```

#### Get Tag by ID

```typescript
const tag = await this.tagService.getTagById('123');
```

#### Create Tag

```typescript
const newTag = await this.tagService.createTag({
  data: {
    type: 'tags',
    attributes: {
      name: 'Urgent'
    }
  }
});
```

#### Update Tag

```typescript
const updatedTag = await this.tagService.updateTag('123', {
  data: {
    type: 'tags',
    id: '123',
    attributes: {
      name: 'Very Urgent'
    }
  }
});
```

#### Delete Tag

```typescript
await this.tagService.deleteTag('123');
```

## API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getTags(queryParams?)` | Retrieve tags with optional query parameters | `queryParams`: object |
| `getTagById(id)` | Get a specific tag by ID | `id`: string |
| `createTag(payload)` | Create a new tag | `payload`: CreateTagRequest |
| `updateTag(id, payload)` | Update an existing tag | `id`: string, `payload`: UpdateTagRequest |
| `deleteTag(id)` | Delete a tag | `id`: string |

### Query Parameters

- `name`: Tag name
- `sort`: Sort field (name, created_at, updated_at)
- `page`: Page number for pagination
- `per_page`: Items per page

### Tag Attributes

- `name`: Tag name (required)

### Response Types

- `TagResponse`: Single tag response
- `TagArrayResponse`: Collection of tags response

## Error Handling

The service properly handles Parasut API errors and provides detailed error messages for debugging.

## Examples

See the [main documentation](../../../../README.md) for more comprehensive examples and the complete API reference.
