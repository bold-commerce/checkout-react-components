const initializeMock = jest.fn();
const handleErrorsMock = jest.fn();

jest.mock('@bold-commerce/checkout-frontend-library', () => ({
    initialize: initializeMock,    
}));

jest.mock('src/utils', () => ({
    handleErrors: handleErrorsMock,
}));

import {render, waitFor} from '@testing-library/react';
import { CheckoutProvider } from 'src/components';
import { applicationStateMock, initialDataMock } from '__mocks__';

describe('Testing CheckoutProvider', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('rendering the component successfully', async () => {
        initializeMock.mockReturnValueOnce(Promise.resolve({
            error: null,
            success: true,
            response: null,
        }));

        render(
            <CheckoutProvider
                applicationState={applicationStateMock}
                initialData={initialDataMock}
                publicOrderId='123456789'
                jwtToken='123456789'
                shopIdentifier='teststore'
            />
        );

        await waitFor(() => expect(initializeMock).toBeCalledTimes(1));
    });

    test('rendering the component with an error', async () => {
        initializeMock.mockReturnValueOnce(Promise.resolve({
            error: {
                status: 500,
            },
            success: false,
            response: null,
        }));

        render(
            <CheckoutProvider
                applicationState={applicationStateMock}
                initialData={initialDataMock}
                publicOrderId='123456789'
                jwtToken='123456789'
                shopIdentifier='teststore'
            />
        );

        await waitFor(() => expect(handleErrorsMock).toBeCalledTimes(1));
        await waitFor(() => expect(initializeMock).toBeCalledTimes(1));
    });
});
