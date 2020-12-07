
import { Component, OnInit, isDevMode } from "@angular/core";
import { Router } from "@angular/router";
import { loaders } from "src/app/shared/loaders";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ILogin } from "../models/ILogin";
import { ITokenData } from "./../models/ITokenData";
import * as authActions from "../state/actions";
import * as fromAuth from "../state/reducers";
import { Store } from "@ngrx/store";
import Swal from "sweetalert2";
import { AuthService } from "../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  public isCollapsed = true;
  loadAPI: Promise<any>;

  inDevMode = false;

  signInForm: FormGroup;
  userPayload: ILogin;
  authState: any;

  isAuthenticating = false;

  jwthelper = new JwtHelperService();
  decodedToken: ITokenData ;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService // private store: Store<fromAuth.AppState>
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-auth");

    this.signInForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  authenticateUser() {
    this.userPayload = {
      username: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value,
    };

    this.performLogin(this.userPayload);
  }

  // performLogin(userPayload: ILogin) {
  //   this.isAuthenticating = true;
  //   console.log(this.isAuthenticating);
  //   this.store.dispatch(new authActions.Login(userPayload));

  //   this.store.subscribe((state) => {
  //     this.authState = state.auth;
  //     if (this.authState.isAuthenticated) {
  //       this.router.navigate(["/admin/dashboard"]);
  //     }
  //     if (!this.authState.isAuthenticating) {
  //       this.isAuthenticating = false;
  //     }
  //   });
  // }

  performLogin(userPayload: ILogin) {
    if (this.signInForm.invalid && !this.signInForm.dirty) {
      this.toastr.error("Kindly enter credential");
      return false;
    }
    this.isAuthenticating = true;
    this.authService.authenticate(userPayload).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.decodedToken =  this.jwthelper.decodeToken(response.token);
        if ( this.decodedToken.role === "Customer"){
            this.router.navigate(["/member/dashboard"]);
        } else {
          this.router.navigate(["/admin/dashboard"]);
        }},
      (error) => {
        if (error === "401") {
          this.toastr.error("Incorrect credentials");
        }
        this.isAuthenticating = false;
      }
    );
  }

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
