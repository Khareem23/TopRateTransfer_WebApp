import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { loaders } from "src/app/shared/loaders";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  public isCollapsed = true;
  loadAPI: Promise<any>;

  constructor(private router: Router) {
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
  }

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
