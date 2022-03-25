import { IApplicationState, IInitializeOrderResponse } from '@bold-commerce/checkout-frontend-library';
import { UPDATE_APP_STATE } from 'src/actions';
import { INITIALIZE_APP } from './actionTypes';

export interface IUpdateAppStateAction {
    type: typeof UPDATE_APP_STATE,
    payload: IApplicationState,
}

export interface IInitializeAction {
    type: typeof INITIALIZE_APP,
    payload: IInitializeOrderResponse,
}

export function actionUpdateAppState(payload: IApplicationState): IUpdateAppStateAction {
    return {
        type: UPDATE_APP_STATE,
        payload,
    };
}

export function actionInitializeApp(payload: IInitializeOrderResponse): IInitializeAction {
    return {
        type: INITIALIZE_APP,
        payload,
    };
}
