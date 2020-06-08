import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeHeaderComponent } from "./_layout/home-header/home-header.component";
import { HomeFooterComponent } from "./_layout/home-footer/home-footer.component";
import { AdminHeaderComponent } from "./_layout/admin-header/admin-header.component";
import { AdminFooterComponent } from "./_layout/admin-footer/admin-footer.component";
import { AdminSidebarComponent } from "./_layout/admin-sidebar/admin-sidebar.component";
import { AdminLayoutComponent } from "./_layout/admin-layout/admin-layout.component";
import { HomeLayoutComponent } from "./_layout/home-layout/home-layout.component";
import { BodyComponent } from './home/body/body.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminLayoutComponent,
    BodyComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
