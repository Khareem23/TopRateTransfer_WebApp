import { User } from "../../_models/User";
import * as fromRoot from "../../../../core/state/IAppState";
import * as fromUser from "./action";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: any;
}

export interface AppState extends fromRoot.IAppState {
  users: UserState;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const defaultUser: UserState = {
  ids: [],
  entities: {},
  selectedUserId: null,
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const initialState = userAdapter.getInitialState(defaultUser);

export function userReducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.UserActionTypes.GET_SINGLE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case fromUser.UserActionTypes.GET_SINGLE_COMPLETED: {
      return userAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id,
        isLoaded: true,
        isLoading: false,
      });
    }
    case fromUser.UserActionTypes.GET_SINGLE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload,
      };
    }
    case fromUser.UserActionTypes.GET_ALL: {
      console.log("reached here");
      return {
        ...state,
        isLoading: true,
      };
    }
    case fromUser.UserActionTypes.GET_ALL_COMPLETED: {
      return userAdapter.addAll(action.payload, {
        ...state,
        isLoading: false,
        isLoaded: true,
      });
    }
    case fromUser.UserActionTypes.GET_ALL_FAILED: {
      return {
        ...state,
        entities: {},
        isLoading: false,
        isLoaded: true,
        error: action.payload,
      };
    }
    case fromUser.UserActionTypes.UPDATE: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }
    case fromUser.UserActionTypes.UPDATE_COMPLETED: {
      return userAdapter.updateOne(action.payload, {
        ...state,
        isLoaded: true,
        isLoading: false,
      });
    }
    case fromUser.UserActionTypes.UPDATE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const getUserFeatureState = createFeatureSelector<UserState>("users");

export const getUsers = createSelector(
  getUserFeatureState,
  userAdapter.getSelectors().selectAll
);
export const getUsersLoading = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isLoading
);

export const getUsersLoaded = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isLoaded
);
