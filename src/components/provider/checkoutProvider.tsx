import React, { useEffect, useCallback, useReducer, useRef, useMemo } from 'react';
import { IApiReturnObject, IInitializeOrderResponse, initialize } from '@bold-commerce/checkout-frontend-library';
import { CheckoutContext, defaultState, IState } from 'src/store';
import { rootReducer } from 'src/reducer';
import { actionInitializeApp } from 'src/actions';
import { handleErrors, getState } from 'src/utils';
import { ICheckoutProviderProps } from 'src/types';
import { updateCustomerMethod } from 'src/common';

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
    const stateRef = useRef<IState>(state);

    const init = useCallback(async () => {
        const response:IApiReturnObject = await initialize(initData,
            shop_identifier,
            environment || { type: 'production' });

        handleErrors(response, dispatch);

        if (response.success) {
            dispatch(actionInitializeApp(initData));
        }
    }, [initData, shop_identifier, environment]);

    const methods = useMemo(() => ({
        updateCustomer: updateCustomerMethod(dispatch, getState(stateRef)),
    }), [stateRef]);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        init();
    }, []);

    return (
        <CheckoutContext.Provider value={{ state, dispatch, methods }}>
            {children}
        </CheckoutContext.Provider>
    );
};
