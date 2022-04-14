import React from 'react';
import { IInitializeAction, IUpdateAppStateAction } from 'src/actions';
import { IState } from './defaultState';

export type DispatchActions = IInitializeAction | IUpdateAppStateAction;

export interface IContextProps {
    state: IState,
    dispatch: React.Dispatch<DispatchActions>,
    methods: any // TODO: Update this type
}

export const CheckoutContext = React.createContext<Partial<IContextProps>>({});
