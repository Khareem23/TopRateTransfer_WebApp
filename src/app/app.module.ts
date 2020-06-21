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

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { AuthLayoutComponent } from "./_layout/auth-layout/auth-layout.component";

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
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
