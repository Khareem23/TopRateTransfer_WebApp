import { Component, OnInit } from "@angular/core";
import { Austrac } from "../_models/Austrac";
import { TransactionService } from "../_services/transaction.service";
import { ReportService } from "../_services/report.service";
import { ToastrService } from "ngx-toastr";
import { saveAs } from "file-saver";

@Component({
  selector: "app-austrac",
  templateUrl: "./austrac.component.html",
  styleUrls: ["./austrac.component.css"],
})
export class AustracComponent implements OnInit {
  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  defaultColGroupDef;
  columnTypes;
  rowData = null;
  editType;
  rowSelection;

  overlayLoadingTemplate;
  overlayNoRowsTemplate;

  austracDetailModel: Austrac;

  fromReportQueryDate: string;
  toReportQueryDate: string;

  constructor(
    private transactionService: TransactionService,
    private reportService: ReportService,
    private toastr: ToastrService
  ) {
    this.columnDefs = [
      {
        headerName: "Id",
        field: "id",
        checkboxSelection: true,
      },
      {
        headerName: "Transaction Detail",
        gorupId: "transactionGroup",
        children: [
          {
            headerName: "Transaction Ref",
            field: "transactionRefNo",
          },
          {
            headerName: "Transaction Amount",
            field: "transactionAmount",
          },
          {
            headerName: "Sender Fullname",
            field: "senderFullName",
          },
          {
            headerName: "Receiver Fullname",
            field: "receiverFullName",
          },
          {
            headerName: "Type of Transaction",
            field: "typeOfTransaction",
          },
          {
            headerName: "Reason for Transaction",
            field: "reasonForTransaction",
          },
          {
            headerName: "Currency Code",
            field: "currencyCode",
          },
        ],
      },
      {
        headerName: "Reporter",
        groupId: "reporterDetail",
        children: [
          {
            headerName: "Report Writer Name",
            field: "reportWriterName",
          },
          {
            headerName: "Report Writer Job Title",
            field: "reportWriterJobTitle",
          },
          {
            headerName: "Report Writer Contact",
            field: "reportWriterPhoneNumber",
          },
          {
            headerName: "Report Writer Email",
            field: "reportWriterEmail",
          },
        ],
      },
    ];
    this.defaultColDef = {
      width: 150,
      editable: false,
      filter: "agTextColumnFilter",
      floatingFilter: false,
      resizable: true,
    };
    this.defaultColGroupDef = { marryChildren: true };
    this.rowSelection = "single";
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
  }

  ngOnInit() {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = true;
    this.gridColumnApi = params.columnApi;
    this.transactionService.getAustracTransactions().subscribe(
      (transactions) => {
        this.rowData = transactions;
      },
      (error) => {
        this.toastr.error("Something went wrong");
      }
    );
  }

  rowSelected() {
    return this.gridApi && this.gridApi.getSelectedRows().length > 0;
  }

  viewSelectedRow() {
    this.austracDetailModel = this.gridApi.getSelectedRows()[0];
    console.log(this.austracDetailModel);
  }

  pullReport() {
    this.toastr.info("Generating Report..");
    return this.reportService
      .getAustracTransactionReport(
        this.fromReportQueryDate,
        this.toReportQueryDate
      )
      .subscribe(
        (response) => {
          this.downloadFile(response, "application/excel");
          this.toastr.success("Report Downloaded!");
        },
        (error) => {
          this.toastr.error("Something went wrong");
        }
      );
  }
  downloadFile(response: any, type: string) {
    let blob = new Blob([response], { type });
    saveAs(blob, "Austrac_Report.xlsx");
  }
}
