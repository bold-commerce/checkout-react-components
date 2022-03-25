import { actionInitializeApp, actionUpdateAppState, INITIALIZE_APP, UPDATE_APP_STATE } from 'src/actions';
import { applicationStateMock, initialDataMock } from '__mocks__';

describe('Testing App Actions', () => {
    test('actionUpdateAppState', () => {
        const payload = applicationStateMock;

        const actionReturnExpectation = {
            type: UPDATE_APP_STATE,
            payload,
        };

        expect(actionUpdateAppState(payload)).toStrictEqual(actionReturnExpectation);
    });

    test('actionInitializeApp', () => {
        const payload = {
            public_order_id: '123456789',
            jwt_token: '123456789',
            initial_data: initialDataMock,
            application_state: applicationStateMock,
        };

        const actionReturnExpectation = {
            type: INITIALIZE_APP,
            payload,
        };

        expect(actionInitializeApp(payload)).toStrictEqual(actionReturnExpectation);
    });
});
