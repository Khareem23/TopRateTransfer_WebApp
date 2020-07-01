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
import { ReactiveFormsModule } from "@angular/forms";
import { RateandchargeComponent } from "./rateandcharge/rateandcharge.component";
import { ToastrService } from "ngx-toastr";
import { TransactionComponent } from "./transaction/transaction.component";
import { RateComponent } from './_shared/rate/rate.component';

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
    path: "admin/transaction",
    component: TransactionComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "admin/rateandcharge",
    component: RateandchargeComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    RateandchargeComponent,
    TransactionComponent,
    RateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    NgbModule,
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents(),
  ],
  providers: [AuthGuard, ToastrService],
})
export class AdminModule {}
