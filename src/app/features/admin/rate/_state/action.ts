import { Action } from "@ngrx/store";
import { Rate } from "../../_models/Rate";
import { Update } from "@ngrx/entity";

export enum RateActionTypes {
  GET = "[Rate] Get Single",
  GET_COMPLETED = "[Rate] Get Single Completed",
  GET_FAILED = "[Rate] Get Single Failed",
  CREATE = "[Rate] Create",
  CREATE_COMPLETED = "[Rate] Create Completed",
  CREATE_FAILED = "[Rate] Create Failed",
  UPDATE = "[Rate] Update",
  UPDATE_COMPLETED = "[Rate] Update Completed",
  UPDATE_FAILED = "[Rate] Update Failed",
}

export class Get implements Action {
  readonly type = RateActionTypes.GET;
}

export class GetCompleted implements Action {
  readonly type = RateActionTypes.GET_COMPLETED;
  constructor(public payload: Rate) {}
}

export class GetFailed implements Action {
  readonly type = RateActionTypes.GET_FAILED;
  constructor(public payload: any) {}
}

export class Create implements Action {
  readonly type = RateActionTypes.CREATE;
  constructor(public payload: Rate) {}
}

export class CreateCompleted implements Action {
  readonly type = RateActionTypes.CREATE_COMPLETED;
  constructor(public payload: any) {}
}

export class CreateFailed implements Action {
  readonly type = RateActionTypes.CREATE_FAILED;
  constructor(public payload: any) {}
}

export class UpdateRate implements Action {
  readonly type = RateActionTypes.UPDATE;
  constructor(public payload: Rate) {}
}

export class UpdateCompleted implements Action {
  readonly type = RateActionTypes.UPDATE_COMPLETED;
  constructor(public payload: Update<Rate>) {}
}

export class UpdateFailed implements Action {
  readonly type = RateActionTypes.UPDATE_FAILED;
  constructor(public payload: any) {}
}

export type RateAction =
  | Get
  | GetCompleted
  | GetFailed
  | Create
  | CreateCompleted
  | CreateFailed
  | UpdateRate
  | UpdateCompleted
  | UpdateFailed;
