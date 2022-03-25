import { IOrderInitialData } from '@bold-commerce/checkout-frontend-library';

export const initialDataMock:IOrderInitialData = {
    shop_name: 'Test Store',
    country_information: [],
    supported_languages: [],
    general_settings: {
        checkout_process: {
            company_name_option: 'optional',
            phone_number_required: false,
            accepts_marketing_checkbox_option: 'unchecked',
        },
        address_autocomplete: {
            provider: null,
            api_key: null,
        },
    },
};
