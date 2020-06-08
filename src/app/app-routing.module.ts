import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeLayoutComponent } from "./_layout/home-layout/home-layout.component";
import { BodyComponent } from "./home/body/body.component";
import { AdminLayoutComponent } from "./_layout/admin-layout/admin-layout.component";
import { DashboardComponent } from "./features/admin/dashboard/dashboard.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  // Home routes goes here
  {
    path: "",
    component: HomeLayoutComponent,
    children: [{ path: "", component: BodyComponent, pathMatch: "full" }],
  },

  // Admin routes goes here
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [{ path: "dashboard", component: DashboardComponent }],
  },

  //no layout routes for auth
  {
    path: "login",
    component: LoginComponent,
  },

  // otherwise redirect home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
