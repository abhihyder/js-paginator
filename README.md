# JS Pagination Crafter

**js-pagination-crafter** is a lightweight utility for simplifying pagination in JavaScript applications. Whether you're working with APIs or databases, js-pagination-crafter provides a straightforward way to generate pagination links and manage pagination logic.

## Features

- **Easy Integration:** Integrate pagination functionality seamlessly into your JavaScript applications with minimal setup.
- **Flexible Configuration:** Customize pagination settings to fit your specific use case, including specifying the current page, limit per page, total number of items, and base URL.
- **Advanced Pagination:** Supports both simple and complex pagination scenarios, including scenarios with large datasets and custom query parameters.
- **Concise and Readable:** Generates clear and concise pagination links, making it easy for users to navigate through paginated content.
- **Lightweight:** Designed to be lightweight and performant, ensuring minimal impact on application performance.

## Installation

You can install **js-pagination-crafter** via npm. Navigate to your project directory and run:

```bash
npm i js-pagination-crafter
```

## Usage

### Basic Usage

```javascript
const paginator = require("js-pagination-crafter");
// Or
import paginator from "js-pagination-crafter";

// Get pagination data
const pagination = paginator({
  currentPage: 10,
  limit: 10,
  totalItem: 200,
  baseUrl: "https://example.com/api/items",
});

console.log(pagination);
```

#### Response

```json
{
  "currentPage": 10,
  "totalPages": 20,
  "from": 91,
  "to": 100,
  "totalItem": 200,
  "links": {
    "first": "https://example.com/api/items?page=1&limit=10",
    "last": "https://example.com/api/items?page=20&limit=10",
    "prev": "https://example.com/api/items?page=9&limit=10",
    "next": "https://example.com/api/items?page=11&limit=10"
  },
  "pagination": [
    {
      "page": 1,
      "url": "https://example.com/api/items?page=1&limit=10"
    },
    {
      "page": 2,
      "url": "https://example.com/api/items?page=2&limit=10"
    },
    {
      "page": "...",
      "url": null
    },
    {
      "page": 9,
      "url": "https://example.com/api/items?page=9&limit=10"
    },
    {
      "page": 10,
      "url": "https://example.com/api/items?page=10&limit=10"
    },
    {
      "page": 11,
      "url": "https://example.com/api/items?page=11&limit=10"
    },
    {
      "page": 12,
      "url": "https://example.com/api/items?page=12&limit=10"
    },
    {
      "page": "...",
      "url": null
    },
    {
      "page": 19,
      "url": "https://example.com/api/items?page=19&limit=10"
    },
    {
      "page": 20,
      "url": "https://example.com/api/items?page=20&limit=10"
    }
  ]
}
```

### Advanced Usage

```javascript
// Specify custom query parameters
const queryString = {
  name: "javascript",
  category: "books",
};

// Pass custom query parameters
const pagination = paginator(
  {
    currentPage: 10,
    limit: 10,
    totalItem: 200,
    baseUrl: "https://example.com/api/items",
  },
  queryString
);

console.log(pagination);
```

#### Response

```json
{
  "currentPage": 10,
  "totalPages": 20,
  "from": 91,
  "to": 100,
  "totalItem": 200,
  "links": {
    "first": "https://example.com/api/items?page=1&limit=10&name=javascript&category=books",
    "last": "https://example.com/api/items?page=20&limit=10&name=javascript&category=books",
    "prev": "https://example.com/api/items?page=9&limit=10&name=javascript&category=books",
    "next": "https://example.com/api/items?page=11&limit=10&name=javascript&category=books"
  },
  "pagination": [
    {
      "page": 1,
      "url": "https://example.com/api/items?page=1&limit=10&name=javascript&category=books"
    },
    {
      "page": 2,
      "url": "https://example.com/api/items?page=2&limit=10&name=javascript&category=books"
    },
    {
      "page": "...",
      "url": null
    },
    {
      "page": 9,
      "url": "https://example.com/api/items?page=9&limit=10&name=javascript&category=books"
    },
    {
      "page": 10,
      "url": "https://example.com/api/items?page=10&limit=10&name=javascript&category=books"
    },
    {
      "page": 11,
      "url": "https://example.com/api/items?page=11&limit=10&name=javascript&category=books"
    },
    {
      "page": 12,
      "url": "https://example.com/api/items?page=12&limit=10&name=javascript&category=books"
    },
    {
      "page": "...",
      "url": null
    },
    {
      "page": 19,
      "url": "https://example.com/api/items?page=19&limit=10&name=javascript&category=books"
    },
    {
      "page": 20,
      "url": "https://example.com/api/items?page=20&limit=10&name=javascript&category=books"
    }
  ]
}
```

## License

This project is licensed under the [MIT License](LICENSE).