import { Component, OnInit, isDevMode } from "@angular/core";
import { loaders } from "src/app/shared/loaders";
import { Rate } from "../_models/Rate";
import { RateService } from "../_services/rate.service";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { UserService } from "../_services/user.service";
import { TransactionService } from "../_services/transaction.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
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

  public barChartData = [{ data: [], label: "Users" }];

  loadAPI: Promise<any>;

  totalRegisteredUser = null;
  totalTransactionCount = null;
  totalAmountProcessed = null;
  totalAmountProcessedForTheMonth = 5000000;

  userMonthly = [];

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private toastr: ToastrService
  ) {
    if (isDevMode()) {
      this.loadAPI = new Promise((resolve) => {
        loaders.loadStyle("../../../../assets/vendor/argon/argon.css");
        resolve(true);
      });
    } else {
      this.loadAPI = new Promise((resolve) => {
        loaders.loadStyle("./assets/vendor/argon/argon.css");
        resolve(true);
      });
    }
  }

  ngOnInit() {
    this.userService.getTotalUsersMonthly().subscribe(
      (data) => {
        this.userMonthly = data;
        this.extractDataForGraph(this.userMonthly);
      },
      (error) => {
        this.toastr.error("Cannot fetch total user count.");
      }
    );

    this.userService.getTotalRegisteredUsers().subscribe(
      (data) => {
        this.totalRegisteredUser = data;
      },
      (error) => {
        this.toastr.error("Cannot fetch total user count.");
      }
    );

    this.transactionService.getTotalTransactionCount().subscribe(
      (data) => {
        this.totalTransactionCount = data;
      },
      (error) => {
        this.toastr.error("Cannot fetch total transaction count.");
      }
    );

    this.transactionService.getTotalAmountProcessed().subscribe(
      (data) => {
        this.totalAmountProcessed = data;
      },
      (error) => {
        this.toastr.error("Cannot fetch total amount processed.");
      }
    );

    this.transactionService.getTotalTransactionForCurrentMonth().subscribe(
      (data) => {
        // this.totalAmountProcessedForTheMonth = data;
      },
      (error) => {
        this.toastr.error("Cannot fetch total amount processed.");
      }
    );
  }

  extractDataForGraph(userMonthly: any[]) {
    let totalUserArr = [];

    userMonthly.forEach((monthly) => {
      totalUserArr.push(monthly.totalUsers);

      this.barChartData = [
        {
          data: totalUserArr,
          label: "Users",
        },
      ];
    });
  }
}
