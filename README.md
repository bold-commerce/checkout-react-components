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

const Component = () => {
  return (
    <ShippingAddress 
      address={{}}
      dispatch={function(){}}
      errors={[]}
      countries={[]}
      provinces={[]}
      showPostalCode={true}
      showProvince={true}
      provinceLabel="Province"
      submit={function(){}}
    />
  );
};
```

### BillingAddress
Displays the billing address form.

```javascript
import { BillingAddress } from '@boldcommerce/checkout-react-components';

const Component = () => {
  return (
    <BillingAddress 
      address={{}}
      sameAsShipping={true}
      setSameAsShipping={function(){}}
      dispatch={function(){}}
      errors={[]}
      countries={[]}
      provinces={[]}
      showPostalCode={true}
      showProvince={true}
      provinceLabel="Province"
      submit={function(){}}
    />
  );
};
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

const Component = () => {
  return (
    <Email
      customer={{}}
      dispatch={function(){}}
      errors={[]}
      submit={function(){}}
    />
  );
};
```

### Order Processed
Displays the order processed screen

```javascript
import { OrderProcessed } from '@boldcommerce/checkout-react-components';

const Component = () => {
  return (
    <OrderProcessed
      customer={{}}
      shippingAddress={{}}
      billingAddress={{}}
      selectedShipping={{}}
      paymentMethod={{}}
    />
  );
};
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
Displays the summary which includes the line items on an order.

```javascript
import { Summary } from '@boldcommerce/checkout-react-components';
```

### LineItems
Displays a list of line items for an order

```javascript
import { LineItems } from '@boldcommerce/checkout-react-components';

const Component = () => {
  return (
    <LineItems
      lineItems={[]}
      updateLineItemQuantity={function(){}}
      removeLineItem={function(){}}
      readOnly={true}
    />
  );
};
```

## Hooks and Custom Components

### useCustomer
Allows your application to get and set current customer attached to the order. UseCustomer has the following methods:

**customer**
- customer information for the current customer attached to order. (ex: email)

**customerErrors**
- returns any validation errors that might have occured while trying to set the customer

**submitCustomer**
- updates the customer on the server.

**loadingCustomer**
- returns true while server state is being updated

```javascript
import { useCustomer } from '@boldcommerce/checkout-react-components';

const CustomerComponent = () => {
  const { customer, customerErrors, loadingCustomer, submitCustomer } = useCustomer();
  const [email, setEmail] = useState(customer.email_address);

  const handleSubmit = () => {
    submitCustomer({
      email_address: email
    });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value))} />
      <button onClick={handleSubmit}>Update Customer</button>
    </div>
  );
};
```

---

### useShippingAddress
Allows your application to update the shipping address that is attached to the order. UseShippingAddress has the following methods:

**shippingAddress**
- Shipping address for the current order (ex: first_name, last_name, address_line_1, etc..)

**loadingShippingAddress**
- Returns true if there is a request currently being made to the server

**shippingAddressCountries**
- Returns an array of all of the shippable countries for a given order. Each country will also have information for the following (show_province, show_postal_code, province_label, provinces)

**submitShippingAddress**
- updates the shipping address on the server

```javascript
import { useShippingAddress } from '@boldcommerce/checkout-react-components';

const AddressComponent = () => {
  const {
    shippingAddress, shippingAddressErrors, shippingAddressCountries, submitShippingAddress,
  } = useShippingAddress();

  const [address, dispatch] = useReducer(addressReducer, shippingAddress);

  const countries = shippingAddressCountries.map((country) => 
    <option value={country.iso_code}>{country.name}</option>
  );

  const handleSubmit = () => {
    submitShippingAddress(address);
  };

  return (
    <div>
      <input
        type="text"
        name="address_line_1"
        value={ address.address_line_1 }
        onChange={
          (e) => dispatch({
            type: 'address_line_1',
            payload: e.target.value
          })
        }
      />
      <select
        name="country"
        value={address.country_code}
        onChange={
          (e) => dispatch({
            type: 'country_code',
            payload: e.target.value
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

### useBillingAddress
Allows your application to update the billing address that is attached to the order. UseShippingAddress has the following methods:

**billingAddress**
- Shipping address for the current order (ex: first_name, last_name, address_line_1, etc..)

**loadingBillingAddress**
- Returns true if there is a request currently being made to the server

**billingAddressCountries**
- Returns an array of all of the shippable countries for a given order. Each country will also have information for the following (show_province, show_postal_code, province_label, provinces)

**submitBillingAddress**
- updates the billing address on the server

```javascript
import { useBillingAddress } from '@boldcommerce/checkout-react-components';

const AddressComponent = () => {
  const {
    billingAddress, billingAddressErrors, billingAddressCountries, submitBillingAddress,
  } = useBillingAddress();

  const [address, dispatch] = useReducer(addressReducer, billingAddress);

  const countries = billingAddressCountries.map((country) => 
    <option value={country.iso_code}>{country.name}</option>
  );

  const handleSubmit = () => {
    submitBillingAddress(address);
  };

  return (
    <div>
      <input
        type="text"
        name="address_line_1"
        value={ address.address_line_1 }
        onChange={
          (e) => dispatch({
            type: 'address_line_1',
            payload: e.target.value
          })
        }
      />
      <select
        name="country"
        value={address.country_code}
        onChange={
          (e) => dispatch({
            type: 'country_code',
            payload: e.target.value
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

**discountCode**
- returns the discount code that was used on the order

**discountApplied**
- returns true if there is currently a discount applied to the order

**removeDiscount**
- removes the current discount from the order

**discountErrors**
- returns any validation errors that may have occured when trying to apply a discount to the order

**submitDiscount**
- updates the discount code on the server

**loadingDiscount**
- returns true if the discount is currently being updated on the server

```javascript
import { useDiscount } from '@boldcommerce/checkout-react-components';

const DiscountComponent = () => {
  const {
    discountCode,
    discountApplied,
    discountErrors,
    submitDiscount,
  } = useDiscount();

  const [discount, setDiscount] = useState(discountCode);

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
      <button onClick={() => submitDiscount(discount)}>Apply</button>
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

**taxesTotal**
- total amount of taxes

**taxes**
- returns an array of taxes on the order

**payments**
- returns an array of payments on the order

**paymentsMade**
- returns number of payments made on order

**paymentStatus**
- returns current status of order

```javascript
import { useBreakdown } from '@boldcommerce/checkout-react-components';

const BreakdownComponent = () => {
  const {
    subTotal,
    shippingTotal,
    discountTotal,
    total,
    taxes,
    payments,
    taxesIncluded,
    taxesTotal,
    paymentsMade,
    paymentStatus,
    remainingBalance,
  } = useBreakdown();

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

**updateLineItemQuantity**
- updates the quantity ordered of a specific line item on the order

**removeLineItem**
- removes a specific line item from the order

**loadingLineItems**
- returns true if line items are being updated on the server

```javascript
import { useLineItems } from '@boldcommerce/checkout-react-components';


const LineItemComponent = () => {
  const { lineItems, updateLineItemQuantity, removeLineItem, loadingLineItems } = useLineItems();

  const lineItemList = lineItems.map((lineItem) => 
    <li>
      <p>{lineItem.product_data.title}</p>
      <input
        type="number"
        value={lineItem.product_data.quantity}
        onChange={(e) => {
          updateLineItemQuantity(e.target.value, lineItem.product_data.line_item_key)
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

**getShippingLines**
- fetches shipping rates for an order

**loadingShippingLines**
- returns true if the server is currently setting a shipping method

**emptyShippingLines**
- return true if there are no applicable shipping methods

```javascript
import { useShippingLines } from '@boldcommerce/checkout-react-components';

const ShippingMethodsComponent = () => {
  const { shippingLines, setShippingLine, selectedShipping, getShippingLines, loadingShippingLines, emptyShippingLines } = useShippingLines();

  useEffect(() => {
    getShippingLines();
  }, []);

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

---
## Helper HOC's

### withCustomerLogic
Decorates a component with the following props:
- customer
- dispatch
- errors
- submit

```javascript
import { withCustomerLogic } from '@boldcommerce/checkout-react-components';

const EmailField = ({
  customer,
  dispatch,
  errors,
  submit,
}) => (
  <section className="FieldSet FieldSet--CustomerInformation">
    <div className="FieldSet__Header">
      <div className="FieldSet__Heading">Customer information</div>
    </div>
    <div className="FieldSet__Content">
      <InputField
        className="InputField Field--Email"
        placeholder="Email"
        type="email"
        name="email"
        messageType={errors && 'alert'}
        messageText={errors && errors[0].message}
        value={customer.email_address}
        onChange={(e) => dispatch({
          type: 'email_address',
          payload: e.target.value,
        })}
        onBlur={submit}
      />
    </div>
  </section>
);

const EnhancedEmailField = withCustomerLogic(EmailField);

const Component = () => {
  return (
    <EnhancedEmailField />
  );
};
```

---

### withShippingAddressLogic
This HOC handles all custom logic around if provinces and postal codes need to be shown and what provinces and postal codes should be called. It also decorates a component with the following props:
- address
- dispatch
- errors
- countries
- provinces
- showPostalCode
- showProvince
- provinceLabel
- submit

```javascript
import { withShippingAddressLogic } from '@boldcommerce/checkout-react-components';

const ShippingAddress = ({
  address,
  dispatch,
  errors,
  countries,
  provinces,
  showPostalCode,
  showProvince,
  provinceLabel,
  submit,
}) => (
  <div>
    <input type="text" value={address.first_name} onChange={(e) => dispatch({
      type: 'first_name',
      payload: e.target.value
    })} />
    <button type="button" onClick={submit}>Submit</button>
  <div>
);

const EnhancedShippingAddress = withShippingAddressLogic(ShippingAddress);

const Component = () => {
  return (
    <EnhancedShippingAddress />
  );
};
```

---

### withBillingAddressLogic
This HOC handles all custom logic around if provinces and postal codes need to be shown and what provinces and postal codes should be called. It also decorates a component with the following props:
- address
- sameAsShipping
- setSameAsShipping
- dispatch
- errors
- countries
- provinces
- showPostalCode
- showProvince
- provinceLabel
- submit

```javascript
import { withBillingAddressLogic } from '@boldcommerce/checkout-react-components';

const BillingAddress = ({
  address,
  sameAsShipping,
  setSameAsShipping,
  dispatch,
  errors,
  countries,
  provinces,
  showPostalCode,
  showProvince,
  provinceLabel,
  submit,
}) => (
  <div>
    <input type="radio" name="billing-address" value="same_as_shipping_address" onChange={() => setSameAsShipping(true)} />
    <input type="radio" name="billing-address" value="different_billing_address" onChange={() => setSameAsShipping(false)} />
    <input type="text" value={address.first_name} onChange={(e) => dispatch({
      type: 'first_name',
      payload: e.target.value
    })} />
    <button type="button" onClick={submit}>Submit</button>
  <div>
);

const EnhancedBillingAddress = withBillingAddressLogic(BillingAddress);

const Component = () => {
  return (
    <EnhancedBillingAddress />
  );
};
```

---

### withLineItemsLogic
Decorates a component with the following props:
- lineItems,
- loadingLineItems
- updateLineItemQuantity
- removeLineItem

```javascript
import { withLineItemsLogic } from '@boldcommerce/checkout-react-components';

const LineItems = ({
  lineItems,
  updateLineItemQuantity,
  removeLineItem,
}) => (
  <>
    {lineItems.map((item) => (
      <div className="SummaryBlock CartItem" key={item.product_data.line_item_key}>
        <Product
          title={item.product_data.title}
          img={item.product_data.image}
          qty={item.product_data.quantity}
          itemPrice={item.product_data.price}
          totalPrice={item.product_data.total_price}
          lineItemKey={item.product_data.line_item_key}
          description={item.product_data.description}
          updateQuantity={updateLineItemQuantity}
          removeLineItem={removeLineItem}
        />
      </div>
    ))}
  </>
);

const EnhancedLineItems = withLineItemsLogic(LineItems);

const Component = () => {
  return (
    <EnhancedLineItems />
  );
};
```

---

### withOrderProcessedLogic
Decorates a component with the following props:
- payments
- customer
- shippingAddress
- billingAddress
- selectedShipping
- paymentMethod

```javascript
import { withOrderProcessedLogic } from '@boldcommerce/checkout-react-components';

const OrderProcessed = ({
  customer,
  shippingAddress,
  billingAddress,
  selectedShipping,
  paymentMethod,
}) => (
  <div>
    Thank you { customer.first_name }
    Email: { customer.email_address }
  <div>
);

const EnhancedOrderProcessed = withOrderProcessedLogic(OrderProcessed);

const Component = () => {
  return (
    <EnhancedOrderProcessed />
  );
};
```

---

### withPaymentLogic
Decorates a component with the following props:
- paymentIframe
- shippingErrors
- billingErrors
- isValid
- isLoading
- completeOrder

```javascript
import { withPaymentLogic } from '@boldcommerce/checkout-react-components';

const PaymentMethod = ({
  paymentIframe,
  shippingErrors,
  billingErrors,
  isLoading,
  isValid,
  completeOrder,
}) => {
  return (
    <div>
      {paymentIframe}
      <Button onClick={completeOrder}>Complete Order</Button>
    </div>
  );
});

const EnhancedPaymentLogic = withPaymentLogic(PaymentMethod);

const Component = () => {
  return (
    <EnhancedPaymentLogic />
  );
};
```

---

### withShippingMethodLogic
This HOC handles all custom logic around automatically fetching shipping rates. It also decorates a component with the following props:
- selectedShipping
- shippingLines
- loadingShippingLines
- emptyShippingLines
- selectedShippingLineIndex
- setSelectedShippingLineIndex
- shippingErrors
- billingErrors

```javascript
import { withShippingMethodLogic } from '@boldcommerce/checkout-react-components';

const ShippingMethod = ({
  shippingLines,
  loadingShippingLines,
  emptyShippingLines,
  selectedShippingLineIndex,
  setSelectedShippingLineIndex,
  shippingErrors,
  billingErrors,
}) => {
  return (
    <section className="FieldSet FieldSet--ShippingMethod">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Shipping method</div>
      </div>
      <div className="FieldSet__Content">
        {shippingLines && shippingLines.map((method, index) => (
          <div className="RadioButton" key={index}>
            <RadioField
              label={method.description}
              name="shipping-method"
              checked={selectedShippingLineIndex === index}
              className="RadioField"
              onChange={() => {
                setSelectedShippingLineIndex(index);
              }}
            />
            <Price className="ShippingMethod__Price" amount={method.amount} />
          </div>
        ))}
      </div>
    </section>
  );
};

const EnhancedShippingMethod = withShippingMethodLogic(ShippingMethod);

const Component = () => {
  return (
    <EnhancedShippingMethod />
  );
};
```