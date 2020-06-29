import { Component, OnInit } from "@angular/core";
import { Charge } from "../_models/Charge";
import { ChargeService } from "../_services/charges.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { Observable } from "rxjs";
import { GridOptions } from "ag-grid-community";
import { Rate } from "../_models/Rate";
import { RateService } from "../_services/rate.service";

@Component({
  selector: "app-rateandcharge",
  templateUrl: "./rateandcharge.component.html",
  styleUrls: ["./rateandcharge.component.css"],
})
export class RateandchargeComponent implements OnInit {
  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  defaultColGroupDef;
  columnTypes;
  rowData = null;
  editType;
  gridOptions: GridOptions;
  rowSelection;

  charges: Charge[] = [];
  chargeForm: FormGroup;
  isLoadingCharge: boolean = false;
  isSubmittingChargeForm: boolean = false;

  rate: Rate;
  isLoadingRate: boolean = false;
  isSubmittingRateForm: boolean = false;
  rateForm: FormGroup;

  overlayLoadingTemplate;
  overlayNoRowsTemplate;

  constructor(
    public chargeService: ChargeService,
    public rateService: RateService,
    private toastr: ToastrService
  ) {
    // this.columnDefs.editable = false;
    this.columnDefs = [
      {
        headerName: "Id",
        field: "id",
        checkboxSelection: true,
      },
      {
        headerName: "Min Amount",
        field: "minAmount",
        editable: true,
      },
      {
        headerName: "Max Amount",
        field: "maxAmount",
        editable: true,
      },
      {
        headerName: "Charge",
        field: "charges",
        editable: true,
      },
      {
        headerName: "Last Updated",
        field: "lastDateUpdated",
        width: 300,
        cellRenderer: (data) => {
          return moment(data.createdDate).format("MM-DD-YYYY HH:mm");
        },
      },
    ];
    this.defaultColDef = {
      width: 150,
      editable: false,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
    };
    this.rowSelection = "multiple";
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
  }

  ngOnInit() {
    this.isLoadingRate = true;
    this.rateService.getRate().subscribe((rate) => {
      this.rate = rate;
      this.isLoadingRate = false;
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.chargeService.getAllCharges().subscribe((charges) => {
      this.rowData = charges;
    });
    params.api.sizeColumnsToFit();
  }

  onCellValueChanged(params) {
    this.toastr.info("Updating changed charge..");
    const changedData = params.newValue;
    let updatedCharge: Charge = params.data;
    let changedField = params.colDef.field;

    switch (changedField) {
      case "minAmount":
        updatedCharge.minAmount = parseInt(changedData);
        break;
      case "maxAmount":
        updatedCharge.maxAmount = parseInt(changedData);
        break;
      case "charges":
        updatedCharge.charges = parseFloat(changedData);
        break;
      default:
        break;
    }

    this.updateCharge(updatedCharge).subscribe((_) => {
      this.toastr.success("Row Updated!");
    });
  }

  rowsSelected() {
    return this.gridApi && this.gridApi.getSelectedRows().length > 0;
  }

  onSubmitToCreateCharge(formDirective: FormGroupDirective) {
    if (this.chargeService.chargeForm.valid) {
      this.isSubmittingChargeForm = true;
      const chargePayload: Charge = {
        minAmount: parseInt(
          this.chargeService.chargeForm.get("minAmount").value
        ),
        maxAmount: parseInt(
          this.chargeService.chargeForm.get("maxAmount").value
        ),
        charges: parseFloat(this.chargeService.chargeForm.get("charges").value),
      };

      this.createCharge(chargePayload).subscribe((charge) => {
        this.toastr.success("Charge Created");
        this.isSubmittingChargeForm = false;
        // this.clearForm(formDirective, this.chargeService);
        this.gridApi.applyTransaction({ add: [charge] });
      });
    }
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

      this.rateService.updateRate(ratePayload).subscribe((newRate) => {
        this.clearForm(formDirective, this.rateService);
        this.isSubmittingRateForm = false;
        this.rate = ratePayload;
        this.toastr.success("Rate Updated!");
      });
    }
  }

  clearForm(fd: FormGroupDirective, service: any) {
    console.log(fd);
    fd.resetForm();
    service.rateForm.reset();
    service.initializeFormGroup();
  }

  deleteSelectedRows() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }

  createCharge(charge: Charge): Observable<Charge> {
    return this.chargeService.createCharge(charge);
  }

  updateCharge(newCharge: Charge): Observable<any> {
    return this.chargeService.updateCharge(newCharge);
  }
}
