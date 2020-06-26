import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { AgGridModule } from "ag-grid-angular";
import { AuthguardService as AuthGuard } from "src/app/global/services/authguard.service";
import { StoreModule, ActionReducerMap } from "@ngrx/store";
import { userReducer, AppState } from "./user/_state/reducer";
import { rateReducer } from "./rate/_state/reducer";
import { EffectsModule } from "@ngrx/effects";
import { UserEffect } from "./user/_state/effect";
import { RateComponent } from "./rate/rate.component";
import { IAppState } from "src/app/core/state/IAppState";
import { adminReducer } from ".";

const adminRoutes: Routes = [
  {
    path: "admin/dashboard",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "admin/user",
    component: UserComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "admin/rate",
    component: RateComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
];

export const reducers: ActionReducerMap<IAppState> = {
  users: userReducer,
  rates: rateReducer,
};

@NgModule({
  declarations: [DashboardComponent, UserComponent, RateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    StoreModule.forFeature("admin", adminReducer),
    EffectsModule.forFeature([UserEffect]),
    NgbModule,
    ChartsModule,
    HttpClientModule,
    AgGridModule.withComponents(),
  ],
  providers: [AuthGuard],
})
export class AdminModule {}
