import { IApplicationState, IOrderInitialData } from '@bold-commerce/checkout-frontend-library';

export interface IAppSettings {
    languageIso: string,
    billingType: 'same' | 'custom',
}

export interface IStatus {
    orderComplete: boolean,
    customerValid: boolean,
    shippingValid: boolean,
}

export interface IIsLoading {
    appHook: boolean,
    billingAddress: boolean,
    customer: boolean,
    discount: boolean,
    lineItems: boolean,
    orderMetadata: boolean,
    orderProcessing: boolean,
    pigiIframe: boolean,
    shippingAddress: boolean,
    shippingLines: boolean,
}

export interface IData {
    jwt_token: string,
    public_order_id: string,
    application_state: IApplicationState | null,
    initial_data: IOrderInitialData | null,
}

export interface IState {
    appSettings: IAppSettings,
    status: IStatus,
    isLoading: IIsLoading,
    errors: string[], // TODO: Update this to proper type
    data: IData,
}

export const defaultState: IState = {
    appSettings: {
        languageIso: 'en',
        billingType: 'same',
        // TODO: Add Google Autocomplete
    },
    status: {
        orderComplete: false,
        customerValid: false,
        shippingValid: false,
    },
    isLoading: {
        appHook: false,
        customer: false,
        shippingAddress: false,
        billingAddress: false,
        shippingLines: false,
        pigiIframe: false,
        lineItems: false,
        discount: false,
        orderMetadata: false,
        orderProcessing: false,
    },
    errors: [],
    data: {
        jwt_token: '',
        public_order_id: '',
        application_state: null,
        initial_data: null,
    },
};
