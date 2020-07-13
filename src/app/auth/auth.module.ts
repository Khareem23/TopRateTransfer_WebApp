import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { authReducer } from "./state/reducers";
import { AuthEffect } from "./state/effects";
import { RegistrationComponent } from "./registration/registration.component";
import { WizardStepComponent } from "./wizard/wizard-step.component";
import { WizardComponent } from "./wizard/wizard.component";

const authRoutes: Routes = [
  { path: "auth/login", component: LoginComponent, pathMatch: "full" },
  {
    path: "auth/register",
    component: RegistrationComponent,
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    WizardStepComponent,
    WizardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffect]),
  ],
})
export class AuthModule {}
