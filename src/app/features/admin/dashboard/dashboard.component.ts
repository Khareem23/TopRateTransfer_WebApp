import { Component, OnInit } from "@angular/core";
import { loaders } from "src/app/shared/loaders";
import { Rate } from "../_models/Rate";
import { RateService } from "../_services/rate.service";
import { FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  rate: Rate;
  isLoadingRate: boolean = false;
  isSubmittingForm: boolean = false;
  rateForm: FormGroup;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 70, 89, 90, 95, 85, 100], label: "Users" },
  ];

  loadAPI: Promise<any>;

  constructor(private rateService: RateService) {
    this.loadAPI = new Promise((resolve) => {
      loaders.loadStyle("../../../../assets/vendor/argon/argon.css");
      resolve(true);
    });
  }

  ngOnInit() {
    this.isLoadingRate = true;
    this.rateService.getRate().subscribe((rate) => {
      this.rate = rate;
      this.isLoadingRate = false;
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.log("was here");
    if (this.rateService.rateForm.valid) {
      this.isSubmittingForm = true;
      const ratePayload: Rate = {
        id: this.rate.id,
        currencyDesc: this.rateService.rateForm.get("desc").value,
        amount: this.rateService.rateForm.get("amount").value,
      };

      this.rateService.updateRate(ratePayload).subscribe((newRate) => {
        console.log(newRate);
        formDirective.resetForm();
        this.rateService.rateForm.reset();
        this.rateService.initializeFormGroup();
        this.isSubmittingForm = false;
        this.rate = ratePayload;
      });
    }
  }
}
