import { Action } from "@ngrx/store";
import { ILogin } from "../models/ILogin";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  LOGIN_COMPLETE = "[Auth] Login Completed",
  LOGIN_FAILURE = "[Auth] Login Failed",
  RETRY_LOGIN = "[Auth] Retry Login",
  LOGOUT = "[Auth] Logout",
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: ILogin) {}
}

export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPLETE;
  constructor(public payload: any) {}
}

export class RetryLogin implements Action {
  readonly type = AuthActionTypes.RETRY_LOGIN;
  constructor(public payload: string) {}
}

export class LoginFailed implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthAction =
  | Login
  | LoginComplete
  | LoginFailed
  | RetryLogin
  | Logout;
