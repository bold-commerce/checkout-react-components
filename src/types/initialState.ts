import { ApplicationState } from "./ApplicationState";
import { Errors } from "./Errors";
import { InitialData } from "./InitialData";
import { LoadingStatus } from "./LoadingStatus";
import { OrderInfo } from "./OrderInfo";
import { OrderTotals } from "./OrderTotals";

export interface InitialState {
  applicationState: ApplicationState,
  initialData: InitialData,
  publicOrderId: string | null,
  token: string | null,
  storeIdentifier: string | null,
  apiBase: string,
  apiPath: string,
  isAuthenticated: boolean,
  orderInfo: OrderInfo, 
  orderTotals: OrderTotals, 
  errors: Errors, 
  loadingStatus: LoadingStatus
}