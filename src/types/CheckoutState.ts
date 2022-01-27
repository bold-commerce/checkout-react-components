import { ApplicationState } from "./ApplicationState";
import { CheckoutErrors } from "./CheckoutErrors";
import { InitialData } from "./InitialData";
import { LoadingStatus } from "./LoadingStatus";
import { OrderInfo } from "./OrderInfo";
import { OrderTotals } from "./OrderTotals";

export interface CheckoutState {
  applicationState: ApplicationState,
  initialData: InitialData,
  publicOrderId: string | null,
  token: string,
  storeIdentifier: string,
  apiBase: string,
  apiPath: string,
  isAuthenticated: boolean,
  orderInfo: OrderInfo, 
  orderTotals: OrderTotals, 
  errors: CheckoutErrors, 
  loadingStatus: LoadingStatus
};