# Protect SDK Switchboard
[![CI](https://concourse.ns8-infrastructure.com/api/v1/teams/main/pipelines/protect-sdk-switchboard/jobs/test/badge)](https://concourse.ns8-infrastructure.com/teams/main/pipelines/protect-sdk-switchboard/jobs/test)
[![CI](https://concourse.ns8-infrastructure.com/api/v1/teams/main/pipelines/protect-sdk-switchboard/jobs/test/badge?title=tests)](https://concourse.ns8-infrastructure.com/teams/main/pipelines/protect-sdk-switchboard/jobs/test)

## Getting Started

The Protect Switchboard SDK houses utitlity methods to assist in the transformation of data from a platform into the data model expected by Protect.

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
utilized internall within the data model methods, but you can call them directly. These methods range from date parsers, enum parsers, validators and
other primitive converters to allow the interfaces to be as flexible as possible.

### Examples

A basic order construction looks like this:

```ts
import {
  toAddress,
  toCustomer,
  toLineItems,
  toOrder,
  toSession,
  toTransactions,
  to
} from '@ns8/protect-sdk-switchboard';

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
