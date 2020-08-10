# Protect SDK Switchboard

[![CircleCI](https://circleci.com/gh/ns8inc/protect-sdk-switchboard.svg?style=svg&circle-token=0d7a67144dc51908cf0aa3ca1a025a23d64c8bef)](https://app.circleci.com/pipelines/github/ns8inc/protect-sdk-switchboard)
[API Documentation](https://ns8inc.github.io/protect-sdk-switchboard/protect-sdk-switchboard.html) is available.

## Table of Contents

- [Protect SDK Switchboard](#protect-sdk-switchboard)
  - [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [`package.json` scripts](#packagejson-scripts)
  - [Basic Usage](#basic-usage)
    - [Utility Methods](#utility-methods)
    - [Examples](#examples)
  - [License](#license)

## Getting Started

To get started, take a look at the documentation listed below:

- docs
  - [Message Queue Architecture and Polling](docs/polling.md)
  - [API Report File for "@ns8/protect-sdk-switchboard"](docs/project-api.md)
  - [Serverless Configuration](docs/serverless.md)
  - [Validation](docs/validation.md)

## Environment Variables

- `AWS_SERVERLESS_YML`: The location of the serverless config. This should be either `serverless.platform.yml` for platform integration switchboards or `serverless.extension.yml` for extension switchboards.
  - Default Value: "node_modules/@ns8/protect-sdk-switchboard/serverless.platform.yml"
- `AWS_SERVICE_NAME`: (Optional) name of the switchboard project.
  - Default Value: ""
- `DEV_SUFFIX`: Developer initials to use in the construction of the lambda and step function ARNs.
  - Default Value: "dev"
- `IGNORE_MARKDOWN_FILES`: A comma-delimited list of markdown files to exclude from processing
  - Default Value: ".serverless,.git,temp"
- `IGNORE_PEER_DEPENDENCIES`: A list of packages to exclude from peer dependencies.
  - Default Value: "@types/aws-lambda,@types/aws4,aws-lambda,aws-sdk,aws4,serverless-plugin-aws-alerts,serverless-pseudo-parameters,serverless-step-functions"
- `NODE_ENV`: Environment. Options are: dev, test and prod.
  - Default Value: "dev"
- `SYNC_PEER_DEPENDENCIES`: If true, sets all project dependencies as peer dependencies
  - Default Value: "true"

## `package.json` scripts

- `yarn build`: Assembles `src` code into a single, minified JS module with type definitions. Exports `build` scripts into a build folder.
- `yarn build:dev`: Builds in dev mode.
- `yarn build:prod`: Builds in production mode.
- `yarn build:project`: Compiles and bundles the `src` code.
- `yarn build:scripts`: Compiles the build scripts.
- `yarn bundle`: Runs WebPack on the `src` code.
- `yarn clean`: Purges all temporary folders
- `yarn count`: Counts lines of source code.
- `yarn deploy`: Deploys the polling lamdbas to AWS.
- `yarn docs:all`: Standardizes markdown and generates the API metadata.
- `yarn docs:api`: Creates a `project-api` Markdown in docs and an `index.d.ts` file in dist.
- `yarn docs:publish`: Generates end-to-end documentation for the entire project and publishes it to the `gh-pages` branch.
- `yarn docs:standardize`: Creates or updates a new readme with a standard set of readme sections, including a toc, yarn script documention, links to repo documentation files and an NS8 license
- `yarn generate:exports`: Generates index.ts files for all exports recursively in the 'src' folder
- `yarn lint`: Lints the codebase and the documentation
- `yarn lint:fix`: Lints the codebase and automatically fixes what it can
- `yarn sortJson`: Performs aesthetic operations to make the project files easier to navigate and read
- `yarn test`: Runs tests and calculates test coverage
- `yarn test:coverage`: Calculates test coverage
- `yarn test:debug`: Runs tests with the debugger
- `yarn undeploy`: Removes the polling lamdbas from AWS

## Basic Usage

The majority of the current use cases for the Switchboard SDK hinge on converting generic objects into typed model objects that can be consumed by Protect.
The basic utility methods provided cover most use cases: `toOrder` would normally be the starting point, and you can chain construction entirely inside that method,
or you can assemble the object as you see fit. Each Protect model maps to an interface, e.g. Protect's `Order` is mapped from the `OrderData` interface.
All interfaces should line up to the Protect naming conventions, with the exception of the interface name which is `${ModelName}Data`.
Each of these interfaces is designed to be as flexible as possible, so that the consumer doesn't need to worry about converting data. For example,
if a property in Protect is expected to be a `Date`, the corresponding property in the SDK will allow `string` or `Date` and handle the conversion for you.
Likewise, if a property in Protect is expected to be an `enum`, the corresponding property in the SDK will be an optional string, and the parser will
cast the string to an enum and has sane defaults if parsing is not possible.

### Utility Methods

Beneath the data model conversion utilities are a number of core utilities that are exposed for convenience if needed. All of the utility methods are
utilized internally within the data model methods, but you can call them directly. These methods range from date parsers, enum parsers, validators and
other primitive converters to allow the interfaces to be as flexible as possible.

### Examples

A basic order construction looks like this:

```ts
import { toAddress, toCustomer, toLineItems, toOrder, toSession, toTransactions } from '@ns8/protect-sdk-switchboard';
const order = toOrder({
  name: '00001',
  currency: 'USD',
  merchantId: 9,
  session: toSession({
    acceptLanguage: 'en',
    ip: '127.0.0.1',
    screenHeight: 400,
    screenWidth: 800,
    userAgent: 'mozilla',
  }),
  addresses: [
    toAddress({
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      country: 'United States',
      countryCode: 'US',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
    }),
  ],
  platformId: 1,
  platformCreatedAt: new Date(),
  transactions: [
    toTransactions({
      amount: 10,
      creditCard,
      currency: 'USD',
      method: '',
      platformId: 1,
      processedAt: baseDate,
      status: '',
      statusDetails: '',
    }),
  ],
  lineItems: [
    toLineItems({
      ean13: '1',
      isGiftCard: false,
      isbn: '1',
      manufacturer: 'GE',
      name: 'Bar',
      platformId: 1,
      platformProductId: 1,
      price: 2.01,
      quantity: 7,
      sku: '123',
      title: 'A barbell',
      totalDiscount: 0,
      upc: '123',
      variantId: '1',
      variantTitle: 'A barbell',
      vendor: 'Amazon',
    }),
  ],
  createdAt: new Date(),
  customer: toCustomer({
    birthday: '01/01/1979',
    company: 'My Co',
    email: 'a@b.com',
    firstName: 'Bob',
    lastName: 'Smith',
    gender: '1',
    phone: '800555555',
    platformId: 9,
  }),
  hasGiftCard: false,
  totalPrice: 20.53,
  updatedAt: new Date(), //Also accepts '09/15/2020'
});
```

## License

See [License](./LICENSE)
© [ns8inc](https://ns8.com)
