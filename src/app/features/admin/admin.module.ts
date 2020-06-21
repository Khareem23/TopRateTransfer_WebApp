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
];

@NgModule({
  declarations: [DashboardComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    NgbModule,
    ChartsModule,
    HttpClientModule,
    AgGridModule.withComponents(),
  ],
  providers: [AuthGuard],
})
export class AdminModule {}
