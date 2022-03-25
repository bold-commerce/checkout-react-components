import { IApplicationState } from '@bold-commerce/checkout-frontend-library';

export const applicationStateMock: IApplicationState = {
    customer: {
        platform_id: null,
        public_id: null,
        first_name: '',
        last_name: '',
        email_address: '',
        accepts_marketing: false,
        saved_addresses: [],
    },
    addresses: {
        shipping: { // TODO: Fix type to allow empty array (This is what checkout returns when there is no address)
            id:  null,
            first_name: '',
            last_name: '',
            address_line_1: '',
            address_line_2: '',
            country: '',
            city: '',
            province: '',
            country_code: '',
            province_code: '',
            postal_code: '',
            business_name: '',
            phone_number: '',
        },
        billing: { // TODO: Fix type to allow empty array (This is what checkout returns when there is no address)
            id:  null,
            first_name: '',
            last_name: '',
            address_line_1: '',
            address_line_2: '',
            country: '',
            city: '',
            province: '',
            country_code: '',
            province_code: '',
            postal_code: '',
            business_name: '',
            phone_number: '',
        },
    },
    line_items: [
        {
            product_data: {
                id: '29115224031284', 
                //product_title: "Test", // TODO: Fix type and add Product Title
                title: 'Default Title',
                image_url: '',
                properties: [],
                description: '',
                quantity: 1,
                price: 2000,
                total_price: 2000,
                visible: false, // TODO: Fix type. This should be number (0 or 1) instead of boolean
                line_item_key: 'ABC123',
                barcode: '',
                compare_at_price: 2000,
                weight: 0,
                weight_unit: '',
                product_id: '3774398332980',
                variant_id: '29115224031284',
                requires_shipping: true,
                sku: '',
                taxable: true,
                tags: '',
                vendor: '',
                //total_weight: 0 // TODO: Fix type and add total weight
            },
            'taxes': [],
            'fees': [],
            'discounts': [],
            //fulfilled_quantity: 0 // TODO: Fix type and add fulfilled quantity
        },
    ],
    shipping: {
        selected_shipping: { // TODO: Fix type to allow null value
            id: '',
            description: '',
            amount: 0,
        },
        available_shipping_lines: [],
        taxes: [],
        discounts: [],
    },
    taxes: [],
    discounts: [],
    payments: [],
    order_total: 1000,
    order_meta_data: {
        cart_parameters: {
            'key': 'value', // TODO: Fix type to allow empty []
        },
        note_attributes: {
            'key': 'value', // TODO: Fix type to allow empty []
        },
        notes: '',
        tags: [],
    },
    resumable_link: '/resume',
    created_via: 'checkout',
};
