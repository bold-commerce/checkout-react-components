import { ApplicationState } from "./applicationState";
import { InitialData } from "./initialData";

export interface InitialState {
  applicationState: ApplicationState,
  initialData: InitialData,
  publicOrderId: string
  token: string,
  storeIdentifier: string,
  apiBase: string,
  apiPath: string,
  isAuthenticated: boolean,
  orderInfo: any, //TODO
  orderTotals: any, //TODO
  errors: any, //TODO
  loadingStatus: any //TODO
}