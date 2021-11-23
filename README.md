# Checkout React Components

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bold-commerce/checkout-react-components/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/@boldcommerce/checkout-react-components.svg?style=flat)](https://www.npmjs.com/package/@boldcommerce/checkout-react-components)

A React component and hooks library for creating checkout experiences utilizing [Bold API's](https://developer.boldcommerce.com/default/documentation/checkout).

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
1. Import components into project
   ```javascript
    import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
   ```
2. Make a request to [orders/init](https://developer.boldcommerce.com/default/documentation/orders#/Orders/post-init) endpoint in your backend application

3. Setup React to render your components and pass result of [orders/init](https://developer.boldcommerce.com/default/documentation/orders#/Orders/post-init) as props.
   ```javascript
   ReactDOM.render(
     <CheckoutProvider
       applicationState={applicationState}
       initialData={initialData}
       publicOrderId={publicOrderId}
       token={token}
       storeIdentifier={storeIdentifier}
     >
      <h1>Hello World</h1>
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


### PaymentIFrame
Displays the PIGI payment iframe.

```javascript
import { PaymentIframe } from '@boldcommerce/checkout-react-components';

const App = (props) => {
  <CheckoutProvider {...props}>
    <PaymentIframe />
  </CheckoutProvider>
}
```

## Hooks

### useApplicationState
Returns entire application state and allows you to manually update application state.

* updateApplicationState can be used to update the application state of your react application after manipulating the order through the Checkout Order API or the Checkout Storefront API.

```javascript
import { useApplicationState } from '@boldcommerce/checkout-react-components';

const CustomWidget = () => {
  const { data, updateApplicationState } = useApplicationState();

  const handleAction = async () => {
    const response = await customRequest();
    await updateApplicationState(response.application_state);
  };

  return (
    <div>
      <button type="button" onClick={handleAction}>Action</button>
    </div>
  );
};
```

### useBillingAddress
Returns all information and methods related to the billing address. You can pass an array of required fields as an argument to useBillingAddress. The required fields you can add are.
- first_name
- last_name
- business_name
- address_line_1
- address_line_2
- city
- phone_number

```javascript
import { useBillingAddress } from '@boldcommerce/checkout-react-components';

const BillingAddress = () => {
  const {
    data,
    submitBillingAddress
  } = useBillingAddress(['first_name', 'last_name']); // Additional required fields

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitBillingAddress({
        first_name: "Jane",
        last_name: "Doe",
        address_line_1: "123 Fake Street",
        address_line_2: "Unit 10",
        country: "Canada",
        country_code: "CA",
        province: "Manitoba",
        province_code: "MB",
        postal_code: "R5H 3V4",
        business_name: "Fake Business",
        phone_name: "2048885555"
      });
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  return (
    <div>
      { errors && <p>{errors[0].message}</p>}
      <button type="button" onClick={handleSubmit} disabled={loading}>Submit Address</button>
    </div>
  );
};
```

### useBillingSameAsShipping
Returns all information and methods related to setting the billing address to be same as shipping.

```javascript
  import { useBillingSameAsShipping } from '@boldcommerce/checkout-react-components';

  const BillingSameAsShipping = () => {
    const { data, setBillingSameAsShipping } = useBillingSameAsShipping();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleChange = async (e) => {
      setLoading(true);
      try {
        await setBillingSameAsShipping(e.target.value);
        setErrors(null);
      } catch(e) {
        setErrors(e.body.errors);
      }
      setLoading(false);
    };

    return (
      <div>
        { errors && <p>{errors[0].message}</p>}
        <label htmlFor="same_as_shipping">Same as Shipping</label>
        <input id="same_as_shipping" type="checkbox" onChange={handleChange} disabled={loading} />
      </div>
    );
  };
```

### useBreakdown
Returns all information related to order status, totals, discount, taxes, and payments.

```javascript
  import { useBreakdown } from '@boldcommerce/checkout-react-components';
  import { Price } from '@boldcommerce/stacks-ui';
  
  const Breakdown = () => {
    const { data } = useBreakdown();
    
    return (
      <div>
        <Price amount={data.subTotal} />
        <Price amount={data.shippingTotal} />
        <Price amount={data.taxesTotal} />
        <Price amount={data.total} />
      </div>
    );
  };
```

### useCountryInfo
Takes an address as an argument and returns available countries, available provinces, and if postal codes are applicable for the selected address.

```javascript
import { useCountryInfo } from '@boldcommerce/checkout-react-components';

const Address = () => {
  const { data } = useCountryInfo({
    address_line_1: "123 Fake Street",
    address_line_2: "Unit 10",
    country: "Canada",
    country_code: "CA",
    province: "Manitoba",
    province_code: "MB",
    postal_code: "R5H 3V4",
  });

  const countryOptions = data.countries.map((country) => <option value={country.iso_code}>{country.name}</option>);

  const provinceOptions = data.provinces ? data.provinces.map((province) => <option value={province.iso_code}>{province.name}</option>) : null;

  return (
    <div>
      <label htmlFor="country">Country</label>
      <select id="country">
        {countryOptions}
      </select>
      { data.showProvince && (
        <label htmlFor="province">{data.provinceLabel}</label>
        <select id="province">
          {provinceOptions}
        </select>
      )}
      { data.showPostalCode && (
        <label htmlFor="postal_code">Postal Code</label>
        <input id="postal_code" type="text" value="">
      )}
    </div>
  );
};
```

### useCustomer
Returns all information related to the customer.

```javascript
import { useCustomer } from '@boldcommerce/checkout-react-components';

const Customer = () => {
  const { data, submitCustomer } = useCustomer();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
       await submitCustomer({
        email_address: 'john.doe@email.com',
        first_name: 'John',
        last_name: 'Doe',
      });
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  return (
    <div>
      { errors && <p>{errors[0].message}</p>}
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={data.email_address} />
      <button type="button" onClick={handleSubmit} disabled={loading}>Submit</button>
    </div>
  );
};
```

### useDiscount
Returns all information related to discounts.

```javascript
import { useDiscount } from '@boldcommerce/checkout-react-components';

const Discount = () => {
  const { data, errors, loadingStatus, applyDiscount, removeDiscount } = useDiscount();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [discount, setDiscount] = useState(data.discountCode);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await applyDiscount(discount);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  }, [discount]);

  return (
    <div>
      { errors && <p>{errors[0].message}</p>}
      <label htmlFor="discount">Discount</label>
      <input
        type="text"
        id="discount"
        value={discount} 
        onChange={(e) => setDiscount(e.target.value)}
      />
      <button type="button" onClick={handleSubmit} disabled={loading}>Apply Discount</button>
    </div>
  );
};
```

### useErrors
Returns all error information.

```javascript
import { useErrors } from '@boldcommerce/checkout-react-components';

const Errors = () => {
  const { data } = useErrors();

  console.log({
    customer: data.customer,
    shippingAddress: data.shippingAddress,
    billingAddress: data.billingAddress,
    shippingLines: data.shippingLines,
    lineItems: data.lineItems,
    orderMetadata: data.orderMetadata,
    discount: data.discount,
    paymentIframe: data.paymentIframe,
    order: data.order,
  });

  return null;
};
```

### useLineItems
Returns all information related to line items.

```javascript
import { useLineItems } from '@boldcommerce/checkout-react-components';

const LineItems = () => {
  const { data, addLineItem, updateLineItemQuantity, removeLineItem } = useLineItems();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleRemove = async (lineItemKey) => {
    setLoading(true);
    try {
      await removeLineItems(lineItemKey);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  const lineItems = data.map((lineItem) => (
    <li>
      <p>{lineItem.product_data.title}</p>
      <p>{lineItem.product_data.quantity}</p>
      <button type="button" onClick={() => handleRemove(lineItem.line_item_key)} disabled={loading}>Remove</button>
    </li>
  ));

  return (
    <ul>
      { errors && <p>{errors[0].message}</p>}
      {lineItems}
    </ul>
  );
};
```

### useLoadingStatus
Returns all loading status information. There are 4 different loading statuses.
* setting (currently making an api request to update a resource)
* fetching (currently making an api request to get the updated resource)
* incomplete (submitting the data was stopped due to required data missing)
* fulfilled (no active api requests for a resource)

```javascript
import { useLoadingStatus } from '@boldcommerce/checkout-react-components';

const LoadingStatus = () => {
  const { data } = useLoadingStatus();

  console.log({
    customer: data.customer,
    shippingAddress: data.shippingAddress,
    billingAddress: data.billingAddress,
    shippingLines: data.shippingLines,
    paymentIframe: data.paymentIframe,
    lineItems: data.lineItems,
    discount: data.discount,
    orderMetadata: data.orderMetadata,
    isLoading: data.isLoading,
  });

  return null;
};
```

### useOrderMetadata
Returns all information related to the order metadata.

```javascript
import { useOrderMetadata } from '@boldcommerce/checkout-react-components';

const OrderMetadata = () => {
  const { data, appendOrderMetadata, overwriteOrderMetadata, clearOrderMetadata } = useOrderMetadata();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // This will not overwrite what is currently in cart_paraterms, note_attributes, or tags. This will append to them.
  const handleAdd = async () => {
    setLoading(true);
    try {
      await appendOrderMetadata({
        cart_parameters: {
          "cp-key2": "Another cart param",
        },
        note_attributes: {
          "na-key2": "Another note attribute",
        },
        notes: "A different delivery instruction.",
        tags: [
          "order-1-other",
        ],
      });
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  // This will completely remove what is currently in cart parameters and add what was passed into handleOverwrite.
  const handleOverwrite = async () => {
    setLoading(true);
    try {
      await handleOverwrite({
        tags: [
          "order-1-other",
        ],
      });
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  return (
    <div>
      { errors && <p>{errors[0].message}</p>}
      <button type="button" onClick={handleAdd} disabled={loading}>Add Metadata</button>
      <button type="button" onClick={handleOverwrite} disabled={loading}>Overwrite Metadata</button>
    </div>
  );
};
```

### useOrderSummary
Returns all information related to the order summary. This includes customer, shipping address, billing address, selected shipping method, and payments.

```javascript
import { useOrderSummary } from '@boldcommerce/checkout-react-components';

const OrderSummary = () => {
  const { data } = useOrderSummary();

  console.log({
    customer: data.customer,
    shippingAddress: data.shippingAddress,
    billingAddress: data.billingAddress,
    selectedShipping: data.selectedShipping,
    payments: data.payments,
  });

  return null;
};
```

### useSavedAddresses
Returns saved addresses for the current customer

```javascript
import { useSavedAddresses } from '@boldcommerce/checkout-react-components';

const SavedAddresses = () => {
  const { data } = useSavedAddresses();

  const savedAddresses = data.map((savedAddress) => {
    return (
      <li>
        <span>{savedAddress.first_name}</span>
        <span>{savedAddress.last_name}</span>
        <span>{savedAddress.address_line_1}</span>
        <span>{savedAddress.address_line_2}</span>
        <span>{savedAddress.country}</span>
        <span>{savedAddress.city}</span>
        <span>{savedAddress.province}</span>
        <span>{savedAddress.country_code}</span>
        <span>{savedAddress.province_code}</span>
        <span>{savedAddress.business_name}</span>
        <span>{savedAddress.phone_number}</span>
      </li>
    )
  });
};
```

### useShippingAddress
Returns all information and methods related to the shipping address. You can pass an array of required fields as an argument to useShippingAddress. The required fields you can add are.
- first_name
- last_name
- business_name
- address_line_1
- address_line_2
- city
- phone_number

```javascript
import { useShippingAddress } from '@boldcommerce/checkout-react-components';

const ShippingAddress = () => {
  const { data, submitShippingAddress } = useShippingAddress(['first_name', 'last_name']); // Additional required fields
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitShippingAddress({
        first_name: "Jane",
        last_name: "Doe",
        address_line_1: "123 Fake Street",
        address_line_2: "Unit 10",
        country: "Canada",
        country_code: "CA",
        province: "Manitoba",
        province_code: "MB",
        postal_code: "R5H 3V4",
        business_name: "Fake Business",
        phone_name: "2048885555"
      });
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  return (
    <div>
      { errors && <p>{errors[0].message}</p>}
      <button type="button" onClick={handleSubmit} disabled={loading}>Submit Address</button>
    </div>
  );
};
```

### useShippingLines
Returns all information related to shipping lines.

```javascript
import { useShippingLines } from '@boldcommerce/checkout-react-components';

const ShippingLines = () => {
  const { data, updateShippingLine, getShippingLines } = useShippingLines();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = async (id) => {
    setLoading(true);
    try {
      await updateShippingLine(id);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  }

  const shippingLines = data.shippingLines.map((shippingLine) => {
    return (
      <li>
        <input type="radio" name="shipping_lines" id="shipping_lines" onChange={() => handleChange(shippingLine.id)} disabled={loading} />
        <p>{ shippingLine.line.description }</p>
        <p>{ shippingLine.line.amount }</p>
      </li>
    );
  }); 

  return (
    <ul>
      { errors && <p>{errors[0].message}</p>}
      {shippingLines}
    </ul>
  );
};
```
