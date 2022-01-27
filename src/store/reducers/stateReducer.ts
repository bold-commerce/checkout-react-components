import { Action } from "../../types/Action";
import { ApplicationState } from "../../types/ApplicationState";
import { ActionType } from "../../types/enums/ActionType";

const stateReducer = (state: ApplicationState, action: Action): ApplicationState => {
  switch (action.type) {
    case ActionType.Checkout_Update:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default stateReducer;
