import { Rate } from "../../_models/Rate";
import * as fromRoot from "../../../../core/state/IAppState";
import * as fromRate from "./action";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface RateState extends EntityState<Rate> {
  selectedRateId: number | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: any;
}

export interface AppState extends fromRoot.IAppState {
  rates: RateState;
}

export const rateAdapter: EntityAdapter<Rate> = createEntityAdapter<Rate>();

export const defaultRate: RateState = {
  ids: [],
  entities: {},
  selectedRateId: null,
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const initialState = rateAdapter.getInitialState(defaultRate);

export function rateReducer(
  state = initialState,
  action: fromRate.RateAction
): RateState {
  switch (action.type) {
    case fromRate.RateActionTypes.CREATE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case fromRate.RateActionTypes.CREATE_COMPLETED: {
      return rateAdapter.addOne(action.payload, state);
    }
    case fromRate.RateActionTypes.CREATE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: action.payload,
      };
    }
    case fromRate.RateActionTypes.GET: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case fromRate.RateActionTypes.GET_COMPLETED: {
      return rateAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id,
        isLoaded: true,
        isLoading: false,
      });
    }
    case fromRate.RateActionTypes.GET_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload,
      };
    }
    case fromRate.RateActionTypes.UPDATE: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }
    case fromRate.RateActionTypes.UPDATE_COMPLETED: {
      return rateAdapter.updateOne(action.payload, {
        ...state,
        isLoaded: true,
        isLoading: false,
      });
    }
    case fromRate.RateActionTypes.UPDATE_FAILED: {
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

const getRateFeatureState = createFeatureSelector<RateState>("rates");

export const getRates = createSelector(
  getRateFeatureState,
  rateAdapter.getSelectors().selectAll
);
export const getUsersLoading = createSelector(
  getRateFeatureState,
  (state: RateState) => state.isLoading
);

export const getRatesLoaded = createSelector(
  getRateFeatureState,
  (state: RateState) => state.isLoaded
);
