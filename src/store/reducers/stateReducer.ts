import { Action, ApplicationState } from "../../types";
import { ActionType } from "../../types/enums";

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
