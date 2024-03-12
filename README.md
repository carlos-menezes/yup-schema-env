# yup-schema-env

Parse environment variables with [jquense/yup](https://github.com/jquense/yup).

## Installation

`pnpm add yup-schema-env`

## Usage

```ts
import { object, number, string } from 'yup'
import { parseEnvironment } from 'yup-schema-env'

const schema = object().shape({
    port: number().default(3000),
    api_key: string(),
})

const env = process.env

const config = parseEnvironment(env, schema)
console.dir(config)
```
