import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, NgbModule],
})
export class AdminModule {}
