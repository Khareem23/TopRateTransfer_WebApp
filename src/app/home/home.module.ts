import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Routes, RouterModule } from "@angular/router";
import { BodyComponent } from "./body/body.component";
import { FormsModule } from "@angular/forms";

const homeRoutes: Routes = [
  { path: "", component: BodyComponent, pathMatch: "full" },
];

@NgModule({
  declarations: [BodyComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(homeRoutes),
    NgbModule,
  ],
})
export class HomeModule {}
