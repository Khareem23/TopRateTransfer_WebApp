import { Component, OnInit, isDevMode } from "@angular/core";
import { loaders } from "../../shared/loaders";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RateService } from "src/app/features/admin/_services/rate.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.css"],
})
export class BodyComponent implements OnInit {
  loadAPI: Promise<any>;

  cashInNai: number = 0;

  currentRate = 0;

  constructor(private rateService: RateService, private toastr: ToastrService) {
    
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

  ngOnInit() {
    this.rateService.getRate().subscribe((rate) => {
      this.currentRate = parseFloat(rate.amount);
      this.calculateEquivalentPrice();
    });
  }

  calculateEquivalentPrice() {
    if (this.currentRate == 0)
      this.toastr.info("Rate service currently not available");

    this.cashInNai = this.currentRate * 1;
  }
}
