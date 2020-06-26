import { ActionReducerMap } from "@ngrx/store";

import * as fromRoot from "../../core/state/IAppState";
import * as fromUser from "../admin/user/_state/reducer";
import * as fromRate from "../admin/rate/_state/reducer";

export interface AdminState {
  users: fromUser.UserState;
  rates: fromRate.RateState;
}

export interface State extends fromRoot.IAppState {
  admin: AdminState;
}

export const adminReducer: ActionReducerMap<AdminState> = {
  users: fromUser.userReducer,
  rates: fromRate.rateReducer,
};
