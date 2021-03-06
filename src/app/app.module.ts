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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthLayoutComponent } from "./_layout/auth-layout/auth-layout.component";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { FooterBannerCardComponent } from "./shared/footer-banner-card/footer-banner-card.component";
import { AuthHeaderComponent } from "./_layout/auth-header/auth-header.component";
import { AuthFooterComponent } from "./_layout/auth-footer/auth-footer.component";
import { HttpErrorInterceptor } from "./global/interceptors/http-error.interceptor";
import { TokenInterceptor } from "./global/interceptors/token.interceptor";

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
    SpinnerComponent,
    FooterBannerCardComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
