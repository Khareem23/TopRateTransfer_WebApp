
import { RouterModule } from '@angular/router';


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthguardService as AuthGuard } from "src/app/global/services/authguard.service";


import { MemberDashboardComponent } from "./member-dashboard/member-dashboard.component";
import { MemberDetailComponent } from "./member-detail/member-detail.component";

import { MemberEditComponent} from "./member-edit/member-edit.component";

import { MemberIDUploadComponent } from "./member-IDUpload/member-IDUpload.component";

import { MemberTransactionListComponent } from "./member-transactionList/member-transactionList.component";
import { MemberTransactionCreateComponent } from "./member-transactionCreate/member-transactionCreate.component";
import { from } from 'rxjs';

const memberRoute = [
  {
    path: "member/dashboard",
    component: MemberDashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "member/detail",
    component: MemberDetailComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "member/edit",
    component: MemberEditComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "member/IDUpload",
    component: MemberIDUploadComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
];



@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(memberRoute),
    ],
  declarations: [
    MemberDashboardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberIDUploadComponent,
    MemberTransactionCreateComponent,
    MemberTransactionListComponent,
  ],
  exports : []
})
export class MemberModule {}
