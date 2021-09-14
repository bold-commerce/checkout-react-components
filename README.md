# Checkout React Components
A React component library for creating checkout experiences utilizing Bold API's. This library utilizes [Bold Commerce Stacks UI](https://www.npmjs.com/package/@boldcommerce/stacks-ui).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Components](#components)
- [Hooks](#hooks)

## Installation
Run the following command
`npm install @boldcommerce/checkout-react-components --save`

If you prefer to use yarn, run the following command
`yarn add @boldcommerce/checkout-react-components`

## Usage
1. Import CSS into project
   ```javascript
    import '@boldcommerce/checkout-react-components/dist/styles.css'
   ```
2. Import components into project
   ```javascript
    import { CheckoutProvider, SinglePageCollapsedLayout } from '@boldcommerce/checkout-react-components';
   ```
3. Make a request to [orders/init](https://developer.boldcommerce.com/default/documentation/orders#/Orders/post-init) endpoint in your backend application

4. Setup React to render your components and pass result of [orders/init](https://developer.boldcommerce.com/default/documentation/orders#/Orders/post-init) as props.
   ```javascript
   ReactDOM.render(
     <CheckoutProvider
       applicationState={applicationState}
       initialData={initialData}
       publicOrderId={publicOrderId}
       token={token}
       storeIdentifier={storeIdentifier}
     >
      <SinglePageCollapsedLayout />
     </CheckoutProvider>,
     document.querySelector('#app'),
   );
   ```

## Examples
- [Single Page](https://github.com/bold-commerce/checkout-react-templates/tree/main/single_page)
- [Single Page Collapsed](https://github.com/bold-commerce/checkout-react-templates/tree/main/single_page_collapsed)
- [Quick Checkout](https://github.com/bold-commerce/checkout-react-templates/tree/main/quick_checkout)

## Components
### CheckoutProvider
The provider communicates with the headless checkout api and holds the application state.

```javascript
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';

const App = (token, publicOrderId, applicationState, storeIdentifier, initialData, handleError) => {
  return (
    <CheckoutProvider
      token={token}
      publicOrderId={publicOrderId}
      applicationState={applicationState}
      storeIdentifier={storeIdentifier}
      initialData={initialData}
      onError={handleError}
    >
      <h1>Hello World</h1>
    </CheckoutProvider>
  );
};
```
#### Component Props
- **token (required)**
  
  This is the jwt (json web token) that was provided from your server when you made a request to the `orders/init` endpoint

- **publicOrderId (required)**
  
  This is the order id of the current order. This is provided from the server when making a request to the `orders/init` endpoint.

- **applicationState (required)**
  
  This is the current state of the order that is used to hydrate your react application. This is useful for resuming a checkout that is still in progress. The application state is provided by the `orders/init` endpoint.

- **storeIdentifier (required)**
  
  This is the identifier for your shop on a given platform. You can retrieve this by making a request to https://api.boldcommerce.com/shops/v1/info endpoint.

- **initialData (required)**
  
  This is all the supporting information for the checkout. (ex: languages, currency, etc.). This is also provided by the `orders/init` endpoint.

- **onError (optional)**
  
  Allows your app to manually handle server errors by supplying a callback function.

### Customer
Displays the customer entry fields and handles all customer logic.

```javascript
import { Customer } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <Customer onChange={handleChange}/>
  </CheckoutProvider>
);
```

#### Component Props
- **onChange** `(function)`  
  If no onChange prop is passed, the customer component will automatically handle submitting changes via the api.
  
  If an onChange prop is passed, you will have to manually handle submitting the customer via the api. The onChange callback will return the current local state of the customer on every input change as well.

### ShippingAddress
Displays the shipping address fields and handles all shipping address logic.

```javascript
import { ShippingAddress } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <ShippingAddress onChange={handleChange}/>
  </CheckoutProvider>
);
```
#### Component Props
- **onChange** `(function)`  
  If no onChange prop is passed, the shipping address component will automatically handle submitting changes via the api.
  
  If an onChange prop is passed, you will have to manually handle submitting the shipping address via the api. The onChange callback will return the current local state of the shipping address on every input change as well.
- **requiredAddressFields** `(array)`
  An array containing the names of the address fields that you want to require the user to fill out. If no requiredAddressFields array is provided, then only country, province, and postal code will be required.
  ```json
  ["first_name", "last_name", "business_name", "address_line_1", "city", "phone_number"]
  ``` 

### BillingAddress
Displays the billing address fields and handles all billing address logic.

```javascript
import { BillingAddress } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <BillingAddress onChange={handleChange}/>
  </CheckoutProvider>
);
```
#### Component Props
- **onChange** `(function)`  
  If no onChange prop is passed, the billing address component will automatically handle submitting changes via the api.
  
  If an onChange prop is passed, you will have to manually handle submitting the billing address via the api. The onChange callback will return the current local state of the billing address on every input change as well.
- **requiredAddressFields** `(array)`
  An array containing the names of the address fields that you want to require the user to fill out. If no requiredAddressFields array is provided, then only country, province, and postal code will be required.
  ```json
  ["first_name", "last_name", "business_name", "address_line_1", "city", "phone_number"]
  ``` 

### ShippingLines
Displays a list of available shipping lines and handles shipping line logic.

Shipping lines will only show once a customer has filled in and submitted their shipping address.

```javascript
import { ShippingLines } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <ShippingLines />
  </CheckoutProvider>
);
```

### PaymentMethod
Displays the payment method iframe and handles payment logic.

Payment method will only show once an order has no errors and a shipping line is selected.

```javascript
import { PaymentMethod } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <PaymentMethod />
  </CheckoutProvider>
);
```

### CheckoutButton
Displays the checkout button and allows the user to complete the order.

```javascript
import { CheckoutButton } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <CheckoutButton />
  </CheckoutProvider>
);
```

### OrderProcessing
You can show this when an order is in the process of being completed.

```javascript
import { OrderProcessing } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    {
      props.isProcessing && <OrderProcessing />
    }
  </CheckoutProvider>
);
```

### OrderProcessed
Displays the summary of the order once the order has been placed.

```javascript
import { OrderProcessed } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    {
      props.processed && <OrderProcessed />
    }
  </CheckoutProvider>
);
```

### SummaryCollapsed
Displays an accordian style summary of the order.

```javascript
import { SummaryCollapsed } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <SummaryCollapsed />
  </CheckoutProvider>
);
```

### Breakdown
Displays a breakdown of payment, shipping, taxes, and discount totals.

```javascript
import { Breakdown } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <Breakdown />
  </CheckoutProvider>
);
```

### Discount
Displays the discount field that a user can use to apply a discount code to the order.

```javascript
import { Discount } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <Discount />
  </CheckoutProvider>
);
```

### LineItems
Displays a list of line items for the current order.

```javascript
import { LineItems } from '@boldcommerce/checkout-react-components';

const App = (props) => (
  <CheckoutProvider {...props}>
    <LineItems />
  </CheckoutProvider>
);
```

### PaymentIFrame
Displays the PIGI payment iframe.

```javascript
import { PaymentIframe } from '@boldcommerce/checkout-react-components';

const App = (props) => {
  <CheckoutProvider {...props}>
    <PaymentIframe hide />
  </CheckoutProvider>
}
```
#### Component Props
- **hide (optional)**  
  If true, will hide the display of the payment iframe. This avoids re-rendering the iframe and clearing previously filled in credit card information. This defaults to false.

### RedactedCreditCard
Displayed a redacted version of the credit card. (Visa **** **** **** 1111)

```javascript
import { RedactedCreditCard } from '@boldcommerce/checkout-react-components';

const App = () => (
  <RedactedCreditCard brand="Visa" lineText="1111">
);
```
#### Component Props
- **brand (required)**  
  Brand to be shown next to the redacted credit card number.

- **lineText (required)**  
  Last four digits to be shown for the redacted credit card number.

## Hooks

### useBillingAddress
Returns all information and methods related to the billing address.

```javascript
import { useBillingAddress } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    billingAddres,
    billingAddressErrors,
    countryInfo,
    billingSameAsShipping,
    submitBillingAddress,
    setBillingSameAsShipping,
  } = useBillingAddress();

  return (
    <div>
      <button onClick={() => setBillingSameAsShipping(true)}>Billing same as shipping?</button>
      <button onClick={() => submitBillingAddress({ ...address })}>Submit<button>
    </div>
  );
);
```
#### Hook Arguments
- **requiredAddressFields** `(array)`
  An array containing the names of the address fields that you want to require the user to fill out. If no requiredAddressFields array is provided, then only country, province, and postal code will be required.
  ```json
  ["first_name", "last_name", "business_name", "address_line_1", "city", "phone_number"]
  ``` 
#### Hook Values
- billingAddress `(object)`
  ```json
  {
    "first_name": "Jane",
    "last_name": "Doe",
    "address_line_1": "123 Fake Street",
    "address_line_2": "Unit 10",
    "country": "Canada",
    "country_code": "CA",
    "province": "Manitoba",
    "province_code": "MB",
    "postal_code": "R5H 3V4",
    "business_name": "Fake Business",
    "phone_name": "2048885555"
  }
  ```
- billingAddressErrors `(object)`
  ```json
  {
    "postal_code": "The postal code provided is not valid."
  }
  ```
- countryInfo `(array)`
  ```json
  [
    {
      "iso_code": "CA",
      "name": "Canada",
      "show_province": true,
      "province_label": "province",
      "show_postal_code": true,
      "provinces": [
        {
          "iso_code": "AB",
          "name": "Alberta",
          "valid_for_shipping": true,
          "valid_for_billing": false
        }
      ]
    }
  ]
  ```
- billingSameAsShipping `(boolean)`
- submitBillingAddress `(function)`
  ```javascript
  submitBillingAddress({
    "address_line_1": "123 Fake Street",
    "address_line_2": "Unit 10",
    "country": "Canada",
    "country_code": "CA",
    "province": "Manitoba",
    "province_code": "MB",
    "postal_code": "R5H 3V4",
    "business_name": "Fake Business",
    "phone_name": "2048885555"
  });
  ```
- setBillingSameAsShipping `(function)`
  ```javascript
  setBillingSameAsShipping(true);
  ```

### useBreakdown
Returns all information related to order status, totals, discount, taxes, and payments.

```javascript
import { useBreakdown } from '@boldcommerce/checkout-react-components';
import { Price } from '@boldcommerce/stacks-ui';

const Component = () => (
  const {
    subTotal,
    shippingTotal,
    excludedTaxes,
    discountTotal,
    total,
    remainingBalance,
    taxesTotal,
    totalItems,
    orderStatus,
    payments,
    hasPayments,
    taxes,
    taxesIncluded,
  } = useBreakdown();

  return (
    <div>
      <Price amount={subTotal} />
      <Price amount={shippingTotal} />
      <Price amount={taxesTotal} />
      <Price amount={total} />
    </div>
  );
);
```
#### Hook Values
- **subTotal** `(number)`
- **shippingTotal** `(number)`
- **excludedTaxes** `(number)`
- **discountTotal** `(number)`

### useLoadingStatus
Returns all information related to loading status of app and different componenets.

```javascript
import { useLoadingStatus, ShippingLines } from '@boldcommerce/checkout-react-components';
import { Price } from '@boldcommerce/stacks-ui';

const Component = () => (
  const {
    isLoading, 
    shippingAddressLoadingStatus, 
    shippingLinesLoadingStatus, 
    customerLoadingStatus, 
    paymentIframeLoadingStatus, 
    lineItemsLoadingStatus, 
    discountLoadingStatus,
  } = useLoadingStatus();

  return (
    <div>
      { 
        shippingLinesLoadingStatus === 'fetching' ? <LoadingState />
        : <ShippingLines />
      }
    </div>
  );
);
```
#### Hook Values
- **isLoading** `(boolean)`
- **shippingAddressLoadingStatus** `(string)`
- **shippingLinesLoadingStatus** `(string)`
- **customerLoadingStatus** `(string)`
- **paymentIframeLoadingStatus** `(string)`
- **lineItemsLoadingStatus** `(string)`
- **discountLoadingStatus** `(string)`

### useCheckoutStore
Returns the entire checkout state.

```javascript
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const { state } = useCheckoutStore();
);
```

### useCountryInfo
Returns a list of countries. If an address is passed to it that has a selected country, it will return a list of provinces for the selected country. This will also return if a postal code field should be shown and what the province and postal code should be called for a specific country.

```javascript
import { useCountryInfo } from '@boldcommerce/checkout-react-components';

const Component = ({ countryInfo }) => (
  const [address, setAddress] = useState({
    address_line_1: '',
    address_line_2: '',
    country_code: 'CA',
    country: 'Canada',
    province_code: 'MB',
    province: 'Manitoba',
    city: 'Winnipeg',
    postal_code: ''
  })

  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = useCountryInfo(countryInfo, address);
);
```

#### Hook Arguments
- **countryInfo**  
  The country_info array in the initial_data object that was returned from the [orders/init](https://developer.boldcommerce.com/default/documentation/orders#/Orders/post-init) endpoint.
  
  You can retrieve country info by using useCheckoutSelector and returning `state.initialData.country_info`.

- **address**  
  Current address that the user has entered. You can store this in local state and pass this into the hook.

#### Hook Values
- **countries** `(array)`
  ```json
  [
    {
      "iso_code":"CA",
      "name":"Canada",
      "show_province":true,
      "province_label":"province",
      "show_postal_code":true,
      "provinces": [
        {
          "iso_code":"AB",
          "name":"Alberta",
          "valid_for_shipping":true,
          "valid_for_billing":false
        }
      ],
      "valid_for_shipping":true,
      "valid_for_billing":false
    }
  ]
  ```
- **provinces** `(array)`
  ```json
  [
    {
      "iso_code":"AB",
      "name":"Alberta",
      "valid_for_shipping":true,
      "valid_for_billing":false
    }
  ]
  ```
- **showProvince** `(boolean)`
- **showPostalCode** `(boolean)`
- **provinceLabel** `(string)`

### useCustomer
Returns all information and methods related to the customer.

```javascript
import { useCustomer } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    customer,
    customerErrors,
    isAuthenticated,
    submitCustomer,
  } = useCustomer();

  const [email, setEmail] = useState(customer.email_address);

  return (
    <div>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}>
      <button onClick={() => submitCustomer({ email_address: email })}>Submit</button>
    </div>
  );
);
```
#### Hook Values
- **customer** `(object)`
  ```json
  {
    "platform_id": null,
    "public_id": "123456789",
    "first_name": "",
    "last_name": ""
    ,"email_address": "email@example.com",
    "saved_addresses": []
  }
  ```
- **customerErrors** `(object)`
  ```json
  {
    "email": "Email format is invalid."
  }
  ```
- **isAuthenticated** `(boolean)`
- **submitCustomer** `(function)`
  ```javascript
  submitCustomer({
    email_address: 'email@example.com'
  });
  ```

### useDiscount
Returns all information and methods related to discounts.

```javascript
import { useDiscount } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    discounts,
    discountApplied,
    discountCode,
    discountTotal,
    discountErrors,
    applyDiscount,
    removeDiscount,
  } = useDiscount();

  const [discount, setDiscount] = useState(discountCode);

  return (
    <div>
      <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)}>
      <button onClick={() => applyDiscount(discount)}>Apply Discount</button>
    </div>
  );
);
```
#### Hook Values
- **discounts** `(array)`
  ```json
  [
    {
      "value": 2000,
      "text": "ABC123",
      "code": "ABC123"
    }
  ]
  ```
- **discountApplied** `(boolean)`
- **discountCode** `(string)`
- **discountTotal** `(number)`
- **discountErrors** `(object)`
  ```json
  {
    "discounts": "Discount code is not valid."
  }
  ```
- **applyDiscount** `(function)`
  ```javascript
  applyDiscount("ABC123");
  ```
- **removeDiscount** `(function)`
  ```javascript
  removeDiscount("ABC123");
  ```

### useLineItems
Returns all information and methods related to line items.

```javascript
import { useLineItems, LineItem } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    lineItems,
    removeLineItem,
    updateLineItemQuantity,
    addLineItem,
  } = useLineItems();

  const lineItemList = lineItems.map((item) => (
    <li>
      <LineItem
        title={item.product_data.title}
        image={item.product_data.image_url}
        quantity={item.product_data.quantity}
        price={item.product_data.price}
        totalPrice={item.product_data.total_price}
        lineItemKey={item.product_data.line_item_key}
        onQuantityChange={(lineItemKey, value) => updateLineItemQuantity(lineItemKey, value)}
        onRemove={(lineItemKey) => removeLineItem(lineItemKey)}
        readOnly={readOnly}
        key={item.product_data.line_item_key}
      />
    </li>
  ));

  return (
    <ul>
      { lineItemList }
    </ul>
  );
);
```
#### Hook Values
- **lineItems** `(array)`
  ```json
  [
    {
      "product_data": {
        "id":"12",
        "title":"Default Title",
        "image_url":"https://example.com/image.jpg",
        "properties":[],
        "description":"",
        "quantity":1,
        "price":2000,
        "total_price":2000,
        "visible":1,
        "line_item_key":"123456789",
        "barcode":"",
        "compare_at_price":2000,
        "weight":1,
        "weight_unit":"kg",
        "product_id":"123",
        "variant_id":"12",
        "requires_shipping":true,
        "sku":"ABC",
        "taxable":false,
        "tags":"",
        "vendor":""
      },
      "taxes":[
        {
          "value":0,
          "name":"GST",
          "is_included":false
        },
        {
          "value":0,
          "name":"PST",
          "is_included":false
        }
      ],
      "fees":[],
      "discounts":[]
    }
  ]
  ```
- **removeLineItem** `(function)`  
  ```javascript
  removeLineItem(line_item_key);
  ```
- **updateLineItemQuantity** `(function)`  
  ```javascript
  updateLineItemQuantity(line_item_key, quantity);
  ```
- **addLineItem** `(function)`
  ```javascript
  addLineItem(platformId, lineItemKey, quantity);
  ```

### useOrderSummary
Returns all information required for an order summary.

```javascript
import { useOrderSummary } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    customer,
    shippingAddress,
    billingAddress,
    selectedShipping,
    payments
  } = useOrderSummary();

  return (
    <div>
      <p>{shippingAddress?.first_name}</p>
      <p>{shippingAddress?.last_name}</p>
      <p>{shippingAddress.address_line_1}</p>
      <p>{shippingAddress.address_line_2}</p>
      <p>{shippingAddress.city}</p>
      <p>{shippingAddress.province_code}</p>
      <p>{shippingAddress.postal_code}</p>
    </div>
  );
);
```
#### Hook Values
- **customer** `(object)`
- **shippingAddress** `(object)`
- **billingAddress** `(object)`
- **selectedShipping** `(object)`
- **payments** `(object)`

### usePaymentIframe
Returns all information and methods required to render and interact with the PIGI payment iframe.

```javascript
import { usePaymentIframe } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    paymentIframeLoadingStatus,
    paymentIframeUrl,
    paymentIframeHeight,
    paymentIframeOnLoaded,
    updateLanguage,
    clearErrorMessage,
    dispayErrorMessage,
    selectPaymentMethod,
  } = usePaymentIframe();

  const style = {
    height: `${paymentIframeHeight}px`
  };

  return (
    <div>
      const iframe = (
        <iframe
          style={style}
          src={paymentIframeUrl}
          onLoad={paymentIframeOnLoaded}
        />
      );
    </div>
  );
);
```
#### Hook Values
- **paymentIframeLoadingStatus** `(boolean)`
- **paymentIframeUrl** `(string)`  
  ```
  https://api.boldcommerce.com/checkout/storefront/{store_identifier}/{public_order_id}/payments/iframe?token={token}
  ```
- **paymentIframeHeight** `(number)`
- **paymentIframeOnLoaded** `(function)`
  ```javascript
  paymentIframeOnLoaded();
  ```
- **updateLanguage** `(function)`
  ```javascript
  updateLanguage('en');
  ```
- **clearErrorMessage** `(function)`
  ```javascript
  clearErrorMessage();
  ```
- **displayErrorMessage** `(function)`
  ```javascript
  displayErrorMessage('message', 'type_of_error');
  ```
- **selectPaymentMethod** `(function)`
  ```javascript
  selectPaymentMethod(1); // Selects by index
  selectPaymentMethod('stripe'); // Selects by payment gateway name
  ```

### usePaymentMethod
Returns information in regards to if the payment method should be shown or not.

```javascript
import { usePaymentIframe } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    showPaymentMethod
  } = usePaymentMethod();

  if (showPaymentMethod) {
    return <CustomPaymentComponent />;
  } else {
    return null;
  }
);
```
#### Hook Values
- **showPaymentMethod** `(boolean)`

### useShippingAddress
Returns all information and methods related to the shipping address.

```javascript
import { useShippingAddress } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    shippingAddres,
    shippingAddressErrors,
    countryInfo,
    submitShippingAddress,
  } = useShippingAddress();

  return (
    <div>
      <button onClick={() => submitShippingAddress({ ...address })}>Submit<button>
    </div>
  );
);
```
#### Hook Arguments
- **requiredAddressFields** `(array)`
  An array containing the names of the address fields that you want to require the user to fill out. If no requiredAddressFields array is provided, then only country, province, and postal code will be required.
  ```json
  ["first_name", "last_name", "business_name", "address_line_1", "city", "phone_number"]
  ``` 
#### Hook Values
- **shippingAddres** `(object)`
  ```json
  {
    "first_name": "Jane",
    "last_name": "Doe",
    "address_line_1": "123 Fake Street",
    "address_line_2": "Unit 10",
    "country": "Canada",
    "country_code": "CA",
    "province": "Manitoba",
    "province_code": "MB",
    "postal_code": "R5H 3V4",
    "business_name": "Fake Business",
    "phone_name": "2048885555"
  }
  ```
- **shippingAddressErrors** `(object)`
  ```json
  {
    "postal_code": "The postal code provided is not valid."
  }
  ```
- **countryInfo** `(array)`
  ```json
  [
    {
      "iso_code": "CA",
      "name": "Canada",
      "show_province": true,
      "province_label": "province",
      "show_postal_code": true,
      "provinces": [
        {
          "iso_code": "AB",
          "name": "Alberta",
          "valid_for_shipping": true,
          "valid_for_billing": false
        }
      ]
    }
  ]
  ```
- **submitShippingAddress** `(function)`
  ```javascript
  submitShippingAddress({
    "address_line_1": "123 Fake Street",
    "address_line_2": "Unit 10",
    "country": "Canada",
    "country_code": "CA",
    "province": "Manitoba",
    "province_code": "MB",
    "postal_code": "R5H 3V4",
    "business_name": "Fake Business",
    "phone_name": "2048885555"
  })
  ```

### useShippingLines
Returns all information and methods related to shipping lines.

```javascript
import { useShippingLines } from '@boldcommerce/checkout-react-components';
import { RadioField, Price } from '@boldcommerce/stacks-ui';

const Component = () => (
  const {
    showShippingLines,
    shippingLinesFetching,
    shippingLinesLoadingStatus,
    shippingLines,
    selectedShippingLineIndex,
    setSelectedShippingLine,
    getShippingLines,
  } = useShippingLines();

  const shippingLineList = shippingLines.map((method, index) => (
    <div className="RadioButton" key={index}>
      <RadioField
        label={method.description}
        name="shipping-method"
        checked={selectedShippingLineIndex === parseInt(method.id, 10)}
        className="RadioField"
        disabled={shippingLinesLoadingStatus === 'setting'}
        onChange={() => setSelectedShippingLine(index)}
      />
      <Price className="ShippingMethod__Price" amount={method.amount} />
    </div>
  ));

  return (
    <div>
      {shippingLineList}
    </div>
  );
);
```
#### Hook Values
- **showShippingLines** `(boolean)`
- **shippingLinesFetching** `(boolean)`
- **shippingLinesLoadingStatus** `(string)`  
  Possible values are: fetching, fulfilled, and setting
- **shippingLines** `(array)`
  ```json
  [
    {
      "id":"0",
      "description":"Canada Post Expedited Parcel",
      "amount":1472
    }
  ]
  ```
- **selectedShippingLineIndex** `(number)`
- **setSelectedShippingLine** `(function)`
  ```javascript
  setSelectedShippingLine(1);
  ```
- **getShippingLines** `(function)`
  ```javascript
  getShippingLines();
  ```

### useOrderMetadata
Returns all information and methods related to order metadata.

```javascript
import { useOrderMetadata } from '@boldcommerce/checkout-react-components';

const Component = () => (
  const {
    orderMetadata,
    orderMetadataLoadingStatus,
    orderMetadataErrors,
    clearOrderMetadata,
    overwriteOrderMetadata,
    appendOrderMetadata,
  } = useOrderMetadata();

  return (
    <div>
      <button onClick={() => appendOrderMetadata("tags",["order-1"])}>Submit<button>
    </div>
  );
);
```
#### Hook Values
- **orderMetaData** `(object)`
  ```json
  {
    "cart_parameters": {
      "cp-key1": "A cart param"
    },
    "note_attributes": {
      "na-key1": "A note attribute"
    },
    "notes": "Special delivery instruction.",
    "tags": [
      "order-1"
    ]
  }
  ```
- **orderMetadataLoadingStatus** `(string)`
- **orderMetadataErrors** `(object)`
  ```json
  {
    "cart_parameters": "validation.required",
    "note_attributes": "validation.required",
    "notes": "validation.required",
    "tags": "validation.required"
  }
  ```
- **clearOrderMetadata** `(function)`
  ```javascript
  clearOrderMetadata();
  ```
- **overwriteOrderMetadata** `(function)`
  ```javascript
  overwriteOrderMetadata({
    "cart_parameters": {
      "cp-key1": "A cart param"
    },
    "note_attributes": {
      "na-key1": "A note attribute"
    },
    "notes": "Special delivery instruction.",
    "tags": [
      "order-1"
    ]
  });
  ```
- **appendOrderMetadata** `(function)`
  ```javascript
  appendOrderMetadata("tags",["order-1-other"]);
  ```