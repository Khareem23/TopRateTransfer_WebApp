import { Action } from "@ngrx/store";
import { User } from "../../_models/User";
import { Update } from "@ngrx/entity";

export enum UserActionTypes {
  GET_ALL = "[User] Get All",
  GET_ALL_COMPLETED = "[User] Get All Completed",
  GET_ALL_FAILED = "[User] Get All Failed",
  GET_SINGLE = "[User] Get Single",
  GET_SINGLE_COMPLETED = "[User] Get Single Completed",
  GET_SINGLE_FAILED = "[User] Get Single Failed",
  UPDATE = "[User] Update",
  UPDATE_COMPLETED = "[User] Update Completed",
  UPDATE_FAILED = "[User] Update Failed",
}

export class GetAll implements Action {
  readonly type = UserActionTypes.GET_ALL;
}

export class GetAllCompleted implements Action {
  readonly type = UserActionTypes.GET_ALL_COMPLETED;
  constructor(public payload: User[]) {}
}

export class GetAllFailed implements Action {
  readonly type = UserActionTypes.GET_ALL_FAILED;
  constructor(public payload: any) {}
}

export class GetSingle implements Action {
  readonly type = UserActionTypes.GET_SINGLE;
  constructor(public payload: any) {}
}

export class GetSingleCompleted implements Action {
  readonly type = UserActionTypes.GET_SINGLE_COMPLETED;
  constructor(public payload: any) {}
}

export class GetSingleFailed implements Action {
  readonly type = UserActionTypes.GET_SINGLE_FAILED;
  constructor(public payload: any) {}
}

export class UpdateTag implements Action {
  readonly type = UserActionTypes.UPDATE;
  constructor(public payload: User) {}
}

export class UpdateCompleted implements Action {
  readonly type = UserActionTypes.UPDATE_COMPLETED;
  constructor(public payload: Update<User>) {}
}

export class UpdateFailed implements Action {
  readonly type = UserActionTypes.UPDATE_FAILED;
  constructor(public payload: any) {}
}

export type UserAction =
  | GetAll
  | GetAllCompleted
  | GetAllFailed
  | GetSingle
  | GetSingleCompleted
  | GetSingleFailed
  | UpdateTag
  | UpdateCompleted
  | UpdateFailed;
