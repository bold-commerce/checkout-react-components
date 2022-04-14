import { IApiErrorResponse } from '@bold-commerce/checkout-frontend-library';

export interface IError extends IApiErrorResponse{
    code?: string;
    address_type: string
}
