import { Action } from "../../types/Action";
import { ApplicationState } from "../../types/ApplicationState";

const stateReducer = (state: ApplicationState, action: Action<ApplicationState>): ApplicationState => {
  switch (action.type) {
    case 'checkout/update':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default stateReducer;
