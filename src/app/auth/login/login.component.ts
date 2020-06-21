import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { loaders } from "src/app/shared/loaders";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ILogin } from "../models/ILogin";
import * as authActions from "../state/actions";
import * as fromAuth from "../state/reducers";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  public isCollapsed = true;
  loadAPI: Promise<any>;

  signInForm: FormGroup;
  userPayload: ILogin;
  authState: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<fromAuth.AppState>
  ) {
    this.loadAPI = new Promise((resolve) => {
      loaders.loadStyle("../../../../assets/vendor/argon/argon.css");
      resolve(true);
    });
  }

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

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

  performLogin(userPayload: ILogin) {
    this.store.dispatch(new authActions.Login(userPayload));

    this.store.subscribe((state) => {
      this.authState = state.auth;
      console.log(this.authState);
    });
  }

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
