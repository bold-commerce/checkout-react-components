# Checkout React Components
A React component library for creating checkout experiences utilizing Bold API's.

## Installation
Run the following command
`npm install @boldcommerce/checkout-react-components --save`

If you prefer to use yarn, run the following command
`yarn add @boldcommerce/checkout-react-components`

## Usage
Import provided components into project
```javascript
import { CheckoutProvider, SinglePageCollapsedLayout } from '@boldcommerce/checkout-react-components';
```

## Components
### Provider Component
The provider communicates with the headless checkout api and holds the application state.

Provider has the following props

**token (required)**
- This is the jwt (json web token) that was provided from your server when you made a request to the `/init` endpoint

**publicOrderId (required)**
- This is the order id of the current order. This is provided from the server when making a request to the `/init` endpoint.

**applicationState (required)**
- This is the current state of the order that is used to hydrate your react application. This is useful for resuming a checkout that is still in progress. The application state is provided by the `/init` endpoint.

**storeIdentifier (required)**
- This is the identifier for your shop on a given platform. You can retrieve this by making a request to https://api.boldcommerce.com/shops/v1/info endpoint.

**initialData (required)**
- This is all the supporting information for the checkout. (ex: languages, currency, etc.). This is also provided by the `/init` endpoint.

```javascript
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';

const App = (token, publicOrderId, applicationState, storeIdentifier, initialData) => {
  return (
    <CheckoutProvider
      token={token}
      publicOrderId={publicOrderId}
      applicationState={applicationState}
      storeIdentifier={storeIdentifier}
      initialData={initialData}
    >
      <h1>Hello World</h1>
    </Checkout>
  );
};
```

### SinglePageCollapsedLayout Component
This is one of the various layouts that can be used. This will include all of the components needed and the fastest and easiest way to get started with a headless checkout.

```javascript
import { CheckoutProvider, SinglePageCollapsedLayout } from '@boldcommerce/checkout-react-components';

const App = () => {
  return (
    <CheckoutProvider>
      <SinglePageCollapsedLayout />
    </Checkout>
  );
}
```

## Components

### Shipping
Displays the shipping address form.

```javascript
import { ShippingAddress } from '@boldcommerce/checkout-react-components';
```

### Billing
Displays the billing address form.

```javascript
import { Billing } from '@boldcommerce/checkout-react-components';
```

### Breakdown
Displays the order breakdown. Ex: Subtotal, Shipping, Taxes, Total, etc.

```javascript
import { Breakdown } from '@boldcommerce/checkout-react-components';
```

### Discount
Displays the discount form.

```javascript
import { Discount } from '@boldcommerce/checkout-react-components';
```

### Email
Displays customer email form.

```javascript
import { Email } from '@boldcommerce/checkout-react-components';
```

### Order Processed
Displays the order processed screen

```javascript
import { OrderProcessed } from '@boldcommerce/checkout-react-components';
```

### Order Processing
Displays the screen that should display while an order is processing

```javascript
import { OrderProcessing } from '@boldcommerce/checkout-react-components';
```

### Payment
Displays the payment form using PIGI (default payment gateway)

```javascript
import { PaymentMethod } from '@boldcommerce/checkout-react-components';
```

### Summary
Displays the summary which shows the line items on an order.

```javascript
import { Summary } from '@boldcommerce/checkout-react-components';
```
## Hooks and Custom Components

### useCustomer
Allows your application to get and set current customer attached to the order. UseCustomer has the following methods:

**customer**
- customer information for the current customer attached to order. (ex: email)

**setCustomer**
- updates the customer that is stored in the local state

**errors**
- returns any validation errors that might have occured while trying to set the customer

**handleSubmit**
- updates the customer on the server.

**isLoading**
- returns true while server state is being updated

```javascript
import { useCustomer } from '@boldcommerce/checkout-react-components';

const CustomerComponent = () => {
  const { customer, setCustomer, errors, isLoading, handleSubmit } = useCustomer();

  const handleEmailChange = (e) => {
    setCustomer({
      email_address: e.target.value
    });
  };

  return (
    <div>
      <input type="email" value={customer.email_address} onChange={handleEmailChange} />
      <button onClick={handleSubmit}>Update Customer</button>
    </div>
  );
};
```

---

### useAddress
Allows your application to update the shipping/billing address that is attached to the order. You can pass either `shipping` or `billing` as an argument into this hook. This will change what address this hook is associated to.

UseAddress has the following methods:

**address**
- shipping/billing information for the current order (ex: first and last name, address line 1, address line 2, country, province, postal code, business name, phone number, city)

**setAddress**
- updates the shipping/billing information stored in local state

**errors**
- returns any validation errors that might have occured while trying to update shipping/billing information.

**countries**
- returns all available countries that a customer can choose for shipping/billing address.

**provinces**
- returns all of the available provinces for the current selected country.

**countryData**
- returns if the current selected country needs to render a province or postal code.
  ```javascript
  {
    show_province, // if current country has provinces/states/territories
    show_postal_code, // if current country has postal/zip codes
    province_label, // what the province selector should be called (ex: Province or State)
  }
  ```

**handleSubmit**
- updates the shipping/billing address on the server

**isLoading**
- returns true if shipping/billing address are currently being updated on the server

```javascript
import { useAddress } from '@boldcommerce/checkout-react-components';

const AddressComponent = () => {
  const { address, setAddress, countries, provinces, countryData, handleSubmit, errors, isLoading } = useAddress('shipping');

  const countries = countries.map((country) => 
    <option value={country.iso_code}>{country.name}</option>
  );

  return (
    <div>
      <input
        type="text"
        name="address_line_1"
        value={ address.address_line_1 }
        onChange={
          (e) => setAddress({
            address_line_1: e.target.value,
          })
        }
      />
      <select
        name="country"
        value={address.country_code}
        onChange={
          (e) => setAddress({
            country_code: e.target.value
          })
        }
      >
        {countries}
      </select>
      <button onClick={handleSubmit}>Update Address</button>
    </div>
  );
}
```

---

### useDiscount
Allows your application to assign a discount code to the order. UseDiscount has the following methods:

**discount**
- returns the discount code that was used on the order

**setDiscount**
- updates current discount attached to order

**discountApplied**
- returns true if there is currently a discount applied to the order

**removeDiscount**
- removes the current discount from the order

**errors**
- returns any validation errors that may have occured when trying to apply a discount to the order

**handleSubmit**
- updates the discount code on the server

**isLoading**
- returns true if the discount is currently being updated on the server

```javascript
import { useDiscount } from '@boldcommerce/checkout-react-components';

const DiscountComponent = () => {
  const { discount, setDiscount, discountApplied, removeDiscount, errors, handleSubmit, isLoading } = useDiscount();

  return (
    <div>
      <input
        type="text"
        value={discount}
        onChange={(e) => {
          setDiscount(e.target.value)
        }}
      />
      <button onClick={removeDiscount}>Remove Discount</button>
      <button onClick={handleSubmit}>Apply</button>
    </div>
  );
};
```

---

### useBreakdown
Allows your application to show summary values. Ex: subtotal, total, taxes, total items, shipping total, etc.

UseBreakdown has the following methods:

**subTotal**
- subtotal of order before shipping, discounts, and taxes.

**shippingTotal**
- total amount for shipping

**taxesTotal**
- total amount for taxes

**taxesIncluded**
- if taxes included with the price of products or separate.

**discountTotal**
- total discount amount on order

**total**
- total of order included shipping, discounts, and taxes.

**remainingBalance**
- if a gift card or payment has been made to the order, this is the remaining amount owed.

**totalItems**
- total number of items in the order

```javascript
import { useBreakdown } from '@boldcommerce/checkout-react-components';

const BreakdownComponent = () => {
  const { subTotal, shippingTotal, taxesTotal, taxesIncluded, discountTotal, total, remainingBalance, totalItems } = useBreakdown();

  return (
    <div>
      <p>Subtotal: {subTotal}</p>
      <p>Shipping: {shippingTotal}</p>
      <p>Taxes: {taxesTotal}</p>
      <p>Total: {total}<p>
    </div>
  );
};
```

---

### useLineItems
Allows you application to show a list of line items in the order and modify them.

UseLineItems has the following methods:

**lineItems**
- list of all of the line items in the order

**updateQuantity**
- updates the quantity ordered of a specific line item on the order

**removeLineItem**
- removes a specific line item from the order

**isLoading**
- returns true if line items are being updated on the server

```javascript
import { useLineItems } from '@boldcommerce/checkout-react-components';


const LineItemComponent = () => {
  const { lineItems, updateQuantity, removeLineItem, isLoading } = useLineItems();

  const lineItemList = lineItems.map((lineItem) => 
    <li>
      <p>{lineItem.product_data.title}</p>
      <input
        type="number"
        value={lineItem.product_data.quantity}
        onChange={(e) => {
          updateQuantity(e.target.value, lineItem.product_data.line_item_key)
        }}
      />
      <button
        onClick={() => {
          removeLineItem(lineItem.product_data.line_item_key)
        }}
      >
        Remove item
      </button>
    </li>
  );

  return (
    <ul>
      {lineItemList}
    <ul>
  )
};
```

---

### useProcessOrder
Allows you to process payment for an order. If you are using a custom payment gateway, you will need to pass the gateway id as an argument into the hook.

UseProcessOrder has the following methods:

**processOrder**
- Triggers order to be processed on the server
- Has an optional argument for a token id for a custom gateway that is not using PIGI

**isProcessing**
- Returns true while an order is being processed.
  
```javascript
import { useProcessOrder } from '@boldcommerce/checkout-react-components';

const CustomGatewayComponent = (gatewayId) => {
  const { processOrder } = useProcessOrder(gatewayId);

  const handleSubmit = (token) => {
    processOrder(token);
  };

  <CustomPaymentGatway
    onSubmit={handleSubmit}
  />
};
```

---

### useShippingLines
Allow your application to get and set shipping methods for an order. UseShippingLines has the following methods:

**shippingLines**
- returns a list of applicable shipping methods for an order

**selectedShipping**
- returns the selected shipping method for an order

**setShippingLine**
- sets the current shipping method for an order

**isLoading**
- returns true if the server is currently setting a shipping method

**isEmpty**
- return true if there are no applicable shipping methods

```javascript
import { useShippingLines } from '@boldcommerce/checkout-react-components';

const ShippingMethodsComponent = () => {
  const { shippingLines, selectedShipping, isLoading, isEmpty } = useShippingLines();

  const shippingLineList = shippingLines.map((shippingLine, index) =>
    <li>
      <input
        type="radio" checked={selectedShipping.id === index}
        onChange={() => {
          setShippingLine(index);
        }}
      />
      <p>{shippingLine.description}</p>
      <p>{shippingLine.amount}</p>
    <li>
  );

  return (
    <ul>
      {shippingLineList}
    <ul>
  );
};
```

---

### useTaxes
Allows your application to display current taxes for an order. UseTaxes has the following methods:

**tax**
- returns a list of taxes on the order

**taxApplied**
- returns true if there are taxes currently on the order

```javascript
import { useTaxes } from '@boldcommerce/checkout-react-components';

const TaxesComponent = () => {
  const { tax } = useTaxes();

  const taxes = tax.map((currentTax) => 
    <li>
      <p>{currentTax.value}</p>
    </li>
  );

  return (
    <ul>
      {taxes}
    </ul>
  );
};
```