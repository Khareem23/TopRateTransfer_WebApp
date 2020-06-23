import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { UserService } from "../../_services/user.service";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import * as userActions from "./action";
import { mergeMap, map, catchError } from "rxjs/operators";
import { User } from "../../_models/User";

@Injectable()
export class UserEffect {
  constructor(private action$: Actions, private userService: UserService) {}

  @Effect()
  getTags$: Observable<Action> = this.action$.pipe(
    ofType<userActions.GetAll>(userActions.UserActionTypes.GET_ALL),
    mergeMap(() =>
      this.userService.getUsers().pipe(
        map(
          (users: User[]) => new userActions.GetAllCompleted(users),
          catchError((err) => of(new userActions.GetAllFailed(err)))
        )
      )
    )
  );
}
