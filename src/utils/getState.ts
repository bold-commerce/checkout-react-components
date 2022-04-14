import { IState } from 'src/store';
import { IGetStateRef } from 'src/types';

export const getState = (stateRef: IGetStateRef) => (): IState => {
    return stateRef.current;
};
