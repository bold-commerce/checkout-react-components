require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
const port = 3000;

app.get('/', async (req, res) => {
  const body = {
    cart_items: [{
      title: 'Test Product',
      id: 123,
      quantity: 1,
      variant_title: null,
      weight: 0,
      taxable: true,
      image: 'https://via.placeholder.com/150',
      requires_shipping: true,
      price: 5000,
      line_item_key: '123456789',
    }],
  };

  const checkout = await fetch(`https://api.boldcommerce.com/checkout/orders/${process.env.SHOP_IDENTIFIER}/init`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });

  const response = await checkout.json();

  const {
    initial_data, application_state, jwt_token, public_order_id,
  } = response.data;

  const store_identifier = process.env.SHOP_IDENTIFIER;

  res.render('checkout', {
    layout: false,
    initial_data: JSON.stringify(initial_data),
    application_state: JSON.stringify(application_state),
    jwt_token,
    public_order_id,
    store_identifier,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
