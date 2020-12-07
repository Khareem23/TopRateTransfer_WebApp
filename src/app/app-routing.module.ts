import { MemberLayoutComponent } from './_layout/member-layout/member-layout.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeLayoutComponent } from "./_layout/home-layout/home-layout.component";
import { AdminLayoutComponent } from "./_layout/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./_layout/auth-layout/auth-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  // Home routes goes here
  {
    path: "",
    component: HomeLayoutComponent,
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },

  // Admin routes goes here
  {
    path: "",
    component: AdminLayoutComponent,
    loadChildren: () =>
      import("./features/admin/admin.module").then((m) => m.AdminModule),
  },

  // Auth routh goes here
  {
    path: "",
    component: AuthLayoutComponent,
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },

  // Pages routh goes here
  {
    path: "",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./features/pages/pages.module").then((m) => m.PagesModule),
  },
  {
   path: "",
   component : MemberLayoutComponent,
   loadChildren : () => import("./features/members/member.module").then((m) => m.MemberModule),
  },

  // otherwise redirect home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
