import { IState } from 'src/store';

export interface IGetStateRef {
    readonly current: IState;
}
