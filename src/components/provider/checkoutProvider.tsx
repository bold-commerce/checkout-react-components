import React, { useEffect, useCallback, useReducer } from 'react';
import { IApiReturnObject, IInitializeOrderResponse, initialize } from '@bold-commerce/checkout-frontend-library';
import { CheckoutContext, defaultState } from 'src/store';
import { rootReducer } from 'src/reducer';
import { actionInitializeApp } from 'src/actions';
import { handleErrors } from 'src/utils';
import { ICheckoutProviderProps } from 'src/types';

export const CheckoutProvider = (props: ICheckoutProviderProps): React.ReactElement => {
    const {
        publicOrderId: public_order_id,
        shopIdentifier: shop_identifier,
        environment,
        jwtToken: jwt_token,
        initialData: initial_data,
        applicationState: application_state,
        children,
    } = props;

    const initData: IInitializeOrderResponse = {
        public_order_id,
        jwt_token,
        initial_data,
        application_state,
    };

    const [state, dispatch] = useReducer(rootReducer, defaultState);

    const init = useCallback(async () => {
        const response:IApiReturnObject = await initialize(initData,
            shop_identifier,
            environment || { type: 'production' });

        handleErrors(response, dispatch);

        if (response.success) {
            dispatch(actionInitializeApp(initData));
        }
    }, [initData, shop_identifier, environment]);

    useEffect(() => {
        init();
    }, []);

    return (
        <CheckoutContext.Provider value={{ state, dispatch }}>
            {children}
        </CheckoutContext.Provider>
    );
};
