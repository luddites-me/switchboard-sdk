# Validation

The Switchboard SDK validates the Order object when created by use of the [`toOrder`](../src/order/toOrder.ts#L90) method. If the order has any invalid property or sub-property (e.g. an Address property is invalid), an exception will be logged and thrown with the specific failures as defined by the [Protect Order model definition](https://github.com/ns8inc/ns8-protect-api/blob/master/src/core/data/model/order/Order.ts#L206).

Protect API uses the [`class-validator`](https://github.com/typestack/class-validator#readme), which works by allowing decorators prefixed with `@` to designate runtime validation that can be invoked by calling the validation methods. For example:

```ts
export class Post {

    @Length(10, 20)
    title: string;

    @Contains("hello")
    text: string;

    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;

    @IsEmail()
    email: string;

    @IsFQDN()
    site: string;

    @IsDate()
    createDate: Date;
}
```

## Implementation

The Switchboard SDK consumes the [`ns8-protect-models`](https://github.com/ns8inc/ns8-protect-models) project, which is simply an export of the protect-api models folder. This allows the SDK to convert the loosely type `{name}Data` classes into the strongly typed model classes that Protect expects. Since `ns8-protect-models` is an exported (and therefore transpiled to JavaScript) project, the decorators and attributes defined in the original source code are not transferred to the compiled code, which means that `class-validator` cannot independently and by itself be used to validate a Protect model. Further, the use of multiple instances of `class-validator` (one from `ns8-protect-models` and the other from `protect-sdk-switchboard`) is not currently supported. For these reasons, the validation is entirely delegated to `ns8-protect-api` and exposed to downstream consumers via two key methods: `isValid` and `getValidationErrors` (see [`IValidatable`](https://github.com/ns8inc/ns8-protect-api/blob/master/src/core/data/model/interface/IValidatable.ts)). [`ValidationErrors`](https://github.com/typestack/class-validator/blob/master/src/validation/ValidationError.ts) include the full validation context as provided by `class-validator`. With the exception of the `Order` class, all protect models that together comprise an instance of an Order implement this interface and these methods. As the `Order` class implements a separate interface, this class exposes these two methods directly (and not by the direction of its implemented interface). On `Order`, the `isValid` and `getValidationErrors` methods validate the entire Order object, its properties, its related classes and all related classes properties and sub-properties.

From within the Switchboard SDK, the underlying implementation of the validation logic is applied only to the [`toOrder`](../src/order/toOrder.ts#L158) method at the conclusion of all data conversions. This allows all nested objects to be fully populated in order that on validation failure, the reported errors will include every failure for every property on the entire object. Therefore, it is strongly recommended to either convert raw data objects using `toOrder` or to manually validate the order using [`validateOrder`](../src/order/toOrder.ts#L166).

The validation methods provided by `class-validator` are asynchronous; therefore significant refactoring was required in order to change the converter logic to also be asynchronous. As validation only occurs automatically via `toOrder` or manually via `validateOrder`, within the SDK these are the only consumer facing methods which are async. The converters for Address, LineItem, etc. remain sync.

## Testing

Unit tests in the Switchboard SDK are implemented using the test runner utilities from [`protect-tools-js`](https://github.com/ns8inc/protect-tools-js/blob/master/src/testRunner/testSdk.ts#L117). As the testing suite was originally written to operate synchronously, the suite had to be refactored to run async and all implementations of the test runner in downstream projects required similar refactoring. As a result of this work, the test suite now fully supports both synchronous and asynchronous tests out of the box.