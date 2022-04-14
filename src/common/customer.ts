import { IApiReturnObject, updateCustomer } from '@bold-commerce/checkout-frontend-library';
import React from 'react';
import { DispatchActions, IState } from 'src/store';
import { IUpdateCustomerMethod } from 'src/types';

export const updateCustomerMethod = (dispatch: React.Dispatch<DispatchActions>, getState: () => IState) => async (data: IUpdateCustomerMethod): Promise<IApiReturnObject> => {
    const {
        email_address: email,
        first_name: firstName,
        last_name: lastName,
        accepts_marketing: acceptsMarketing,
    } = data;

    // eslint-disable-next-line no-console
    console.log(getState());
    
    // TODO: Change between add guest customer and update customer
    const response = await updateCustomer(firstName || '', lastName || '', email || '', acceptsMarketing || false);

    return response;
};
