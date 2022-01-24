import { ApplicationState } from "./ApplicationState";
import { InitialData } from "./InitialData";

export interface InitialState {
  applicationState: ApplicationState,
  initialData: InitialData,
  publicOrderId: string | null,
  token: string | null,
  storeIdentifier: string | null,
  apiBase: string,
  apiPath: string,
  isAuthenticated: boolean,
  orderInfo: any, //TODO
  orderTotals: any, //TODO
  errors: any, //TODO
  loadingStatus: any //TODO
}