import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TandcComponent } from "./tandc/tandc.component";
import { Routes, RouterModule } from "@angular/router";
import { PrivacyComponent } from "./privacy/privacy.component";

const pagesRoutes: Routes = [
  { path: "tandc", component: TandcComponent },
  { path: "privacy", component: PrivacyComponent },
];

@NgModule({
  declarations: [TandcComponent, PrivacyComponent],
  imports: [CommonModule, RouterModule.forChild(pagesRoutes)],
})
export class PagesModule {}
