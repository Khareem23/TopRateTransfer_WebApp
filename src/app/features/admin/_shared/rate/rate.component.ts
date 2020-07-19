import { Component, OnInit } from "@angular/core";
import { Rate } from "../../_models/Rate";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { RateService } from "../../_services/rate.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-rate",
  templateUrl: "./rate.component.html",
  styleUrls: ["./rate.component.css"],
})
export class RateComponent implements OnInit {
  rate: Rate;
  isLoadingRate: boolean = false;
  isSubmittingRateForm: boolean = false;
  rateForm: FormGroup;
  rateDesc;

  constructor(public rateService: RateService, private toastr: ToastrService) {}

  ngOnInit() {
    this.isLoadingRate = true;
    this.rateService.getRate().subscribe((rate) => {
      this.rate = rate;
      this.rateDesc = rate.currencyDesc;
      this.isLoadingRate = false;
    });
  }

  onSubmitToUpdateRate(formDirective: FormGroupDirective) {
    if (this.rateService.rateForm.valid) {
      this.toastr.info("Updating Rate...");
      this.isSubmittingRateForm = true;
      const ratePayload: Rate = {
        id: this.rate.id,
        currencyDesc: this.rateService.rateForm.get("desc").value,
        amount: this.rateService.rateForm.get("amount").value,
      };

      this.rateService.updateRate(ratePayload).subscribe(
        (newRate) => {
          //this.clearForm(formDirective, this.rateService);
          this.isSubmittingRateForm = false;
          this.rate = ratePayload;
          this.toastr.success("Rate Updated!");
        },
        (error) => {
          this.toastr.error("Something went wrong");
        }
      );
    }
  }

  clearForm(fd: FormGroupDirective, service: any) {
    console.log(fd);
    fd.resetForm();
    service.rateForm.reset();
    service.initializeFormGroup();
  }
}
