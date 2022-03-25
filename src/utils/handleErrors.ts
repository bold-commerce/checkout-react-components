import { IApiReturnObject, IFetchError } from '@bold-commerce/checkout-frontend-library';
import {apiErrors, httpStatusCode} from '@bold-commerce/checkout-frontend-library/lib/variables';
import React from 'react';
import { DispatchActions } from 'src/store';

export function handleErrors(response: IApiReturnObject, dispatch: React.Dispatch<DispatchActions>): void {
    const error: IFetchError = response.error;

    if (error) {
        switch(error) {
            case apiErrors.noCsrf.status:
            case apiErrors.noAppState.status:
            case apiErrors.emptyAppState.status:
            case apiErrors.noResData.status:
            case apiErrors.emptyResData.status:
            case apiErrors.general.status:
            case apiErrors.noPigiIframe.status:
            case apiErrors.errorsInResponse.status:
            case apiErrors.emptyFieldInResponse.status:
            case apiErrors.emptyKeysToCheck.status:
            case apiErrors.noFieldInResponse.status:
            case httpStatusCode.UNAUTHORIZED:
            case httpStatusCode.UNPROCESSABLE_ENTITY:
            default:
                // eslint-disable-next-line no-console
                console.error(error); //TODO: unhandled exception
        }
    }
}
