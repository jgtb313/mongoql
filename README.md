# mongoql

<!-- [![Build Status](https://travis-ci.org/jgtb313/mongoql.svg?branch=master)](https://travis-ci.org/jgtb313/mongoql) -->
[![License](https://badgen.net/github/license/jgtb313/mongoql)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/mongoql)](https://bundlephobia.com/result?p=mongoql)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/mongoql)](https://bundlephobia.com/result?p=mongoql)

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install mongoql --save

# For Yarn, use the command below.
yarn add mongoql
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/mongoql"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/mongoql"></script>

<script>
  // UMD module is exposed through the "mongoql" global variable.
  console.log(mongoql);
</script>
```

## Usage

```js
import MongoQL from 'mongoql'

const UsersRelationships = {
  address: [
    [
      'address',
      MongoQL.hasOne({
        from: 'addresses',
        localField: '_id',
        foreignField: 'user',
        as: 'address'
      })
    ]
  ],
  products: [
    [
      'products',
      MongoQL.hasMany({
        from: 'products',
        localField: '_id',
        foreignField: 'user',
        as: 'products'
      })
    ]
  ]
}

const UsersQL = MongoQL.prepare(UsersRelationships)
```

#### `with relationships`

```js
const req = {
  query: {
    fields: 'name,address.zipcode,products.name'
  }
}

const pipeline = UsersQL.pipeline(req.query)

[
  {
    "$lookup": {
      "from": "addresses",
      "let": {
        "value": "$_id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$user",
                "$$value"
              ]
            }
          }
        },
        {
          "$project": {
            "zipcode": 1
          }
        }
      ],
      "as": "address"
    }
  },
  {
    "$unwind": {
      "path": "$address",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$lookup": {
      "from": "products",
      "let": {
        "value": "$_id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$user",
                "$$value"
              ]
            }
          }
        },
        {
          "$project": {
            "name": 1
          }
        }
      ],
      "as": "products"
    }
  },
  {
    "$project": {
      "name": 1,
      "address.zipcode": 1,
      "products.name": 1
    }
  }
]
```

#### `without relationships`

```js
const req = {
  query: {
    fields: 'name'
  }
}

const pipeline = UsersQL.pipeline(req.query)

[
  {
    "$project": {
      "name": 1
    }
  }
]
```

#### `with filters`

```js
const req = {
  query: {
    name: 'João',
    'address.zipcode': '00000-000',
    fields: 'name,address.zipcode'
  }
}

const pipeline = UsersQL.pipeline(req.query)

[
  {
    "$match": {
      "name": "João"
    }
  },
  {
    "$lookup": {
      "from": "addresses",
      "let": {
        "value": "$_id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$user",
                "$$value"
              ]
            }
          }
        },
        {
          "$match": {
            "zipcode": "00000-000"
          }
        },
        {
          "$project": {
            "zipcode": 1
          }
        }
      ],
      "as": "address"
    }
  },
  {
    "$unwind": {
      "path": "$address",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$project": {
      "name": 1,
      "address.zipcode": 1
    }
  }
]
```

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).
