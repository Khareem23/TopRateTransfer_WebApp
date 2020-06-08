import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"],
})
export class AdminLayoutComponent implements OnInit {
  loadAPI: Promise<any>;

  constructor() {
    this.loadAPI = new Promise((resolve) => {
      this.loadStyle("../../../../assets/vendor/dashboard/argon.scss");
      resolve(true);
    });
  }

  ngOnInit() {}

  public loadStyle(styleName: string) {
    const head = document.getElementsByTagName("head")[0];

    let themeLink = document.getElementById("client-theme") as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = document.createElement("link");
      style.id = "client-theme";
      style.rel = "stylesheet";
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
