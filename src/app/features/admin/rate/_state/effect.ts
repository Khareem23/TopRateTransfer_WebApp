import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { RateService } from "../../_services/rate.service";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import * as rateActions from "./action";
import { mergeMap, map, catchError } from "rxjs/operators";
import { Rate } from "../../_models/Rate";

@Injectable()
export class RateEffect {
  constructor(private action$: Actions, private rateService: RateService) {}

  @Effect()
  getRate$: Observable<Action> = this.action$.pipe(
    ofType<rateActions.Get>(rateActions.RateActionTypes.GET),
    mergeMap(() =>
      this.rateService.getRate().pipe(
        map(
          (rate: Rate) => new rateActions.GetCompleted(rate),
          catchError((err) => of(new rateActions.GetFailed(err)))
        )
      )
    )
  );

  @Effect()
  createRate$: Observable<Action> = this.action$.pipe(
    ofType<rateActions.Create>(rateActions.RateActionTypes.CREATE),
    map((action: rateActions.Create) => action.payload),
    mergeMap((rate: Rate) =>
      this.rateService.createRate(rate).pipe(
        map((newRate: Rate) => new rateActions.CreateCompleted(newRate)),
        catchError((err) => of(new rateActions.CreateFailed(err)))
      )
    )
  );

  @Effect()
  updateRate$: Observable<Action> = this.action$.pipe(
    ofType<rateActions.UpdateRate>(rateActions.RateActionTypes.UPDATE),
    map((action: rateActions.UpdateRate) => action.payload),
    mergeMap((rate: Rate) =>
      this.rateService.updateRate(rate).pipe(
        map(
          (edittedRate: Rate) =>
            new rateActions.UpdateCompleted({
              id: edittedRate.id,
              changes: edittedRate,
            })
        ),
        catchError((err) => of(new rateActions.UpdateFailed(err)))
      )
    )
  );
}
