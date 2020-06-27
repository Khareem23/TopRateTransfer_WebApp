import { Component, OnInit, isDevMode } from "@angular/core";
import { loaders } from "../../shared/loaders";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.css"],
})
export class BodyComponent implements OnInit {
  loadAPI: Promise<any>;

  constructor() {
    if (isDevMode()) {
      this.loadAPI = new Promise((resolve) => {
        loaders.loadScript("../../../assets/js/home.js");
        resolve(true);
      });
      this.loadAPI = new Promise((resolve) => {
        loaders.loadStyle("../../assets/vendor/material/material-kit.css");
        resolve(true);
      });
    } else {
      this.loadAPI = new Promise((resolve) => {
        loaders.loadScript("./assets/js/home.js");
        resolve(true);
      });
      this.loadAPI = new Promise((resolve) => {
        loaders.loadStyle("./assets/vendor/material/material-kit.css");
        resolve(true);
      });
    }
  }

  ngOnInit() {}
}
