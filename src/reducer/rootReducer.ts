import { appSettingsReducer, dataReducer, errorsReducer, loadingReducer } from 'src/reducer';
import { IState, DispatchActions } from 'src/store';
import { statusReducer } from './statusReducer';

export const rootReducer = (state: IState, action: DispatchActions): IState => {
    return {
        appSettings: appSettingsReducer(state.appSettings, action),
        status: statusReducer(state.status, action),
        isLoading: loadingReducer(state.isLoading, action),
        errors: errorsReducer(state.errors, action),
        data: dataReducer(state.data, action),
    };
};
