import { IApplicationState, IOrderInitialData } from '@bold-commerce/checkout-frontend-library';

export interface IEnvironment {
    type: string
}

export interface ICheckoutProviderProps {
    applicationState: IApplicationState,
    initialData: IOrderInitialData,
    publicOrderId: string,
    jwtToken: string,
    shopIdentifier: string,
    environment?: IEnvironment,
    children?: React.ReactNode
}
