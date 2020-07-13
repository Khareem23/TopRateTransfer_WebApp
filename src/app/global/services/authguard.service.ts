import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { resolve } from "url";
import { promise } from "protractor";

@Injectable({
  providedIn: "root",
})
export class AuthguardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    return new Promise((resolve) => {
      return resolve(true);
      if (!this.auth.isAuthenticatedAsManager()) {
        this.router.navigate(["/auth/login"]);

        resolve(false);
      }
      resolve(true);
    });
  }
}
