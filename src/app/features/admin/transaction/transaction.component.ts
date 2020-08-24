import { Component, OnInit } from "@angular/core";
import { TransactionService } from "../_services/transaction.service";
import { ToastrService } from "ngx-toastr";
import { Transaction } from "../_models/Transaction";
import { TransactionForUpdate } from "../_models/TransactionForUpdate";
import * as moment from "moment";
import { ReportService } from "../_services/report.service";
import { saveAs } from "file-saver";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent implements OnInit {
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

  transactionDetailModel: Transaction;

  reportQueryDate: string;

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
        headerName: "Ref Num",
        field: "referenceNumber",
      },
      {
        headerName: "Amount Sent",
        cellRenderer: (data) => {
          var amount = data.data.amountToSend;
          return amount.toLocaleString();
        },
      },
      {
        headerName: "Transaction Status",
        groupId: "statusGroup",
        children: [
          {
            headerName: "Status",
            field: "status",
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
              cellHeight: 50,
              values: ["Processing", "Completed", "OnHold", "Failed"],
            },
            editable: true,
            filter: true,
          },
          {
            headerName: "On Hold",
            field: "isHold",
            type: "statusColumn",
          },
          {
            headerName: "Paid Out",
            field: "isPaidOut",
            type: "statusColumn",
          },
          {
            headerName: "Status Description",
            field: "statusDescription",
            editable: true,
            width: 250,
          },
        ],
      },
      {
        headerName: "Pay In Method",
        field: "payInMethod",
      },
      {
        headerName: "Date",
        groupId: "dateGroup",
        children: [
          {
            headerName: "Date Sent",
            cellRenderer: (data) => {
              return moment(data.data.dateSent).format("MM-DD-YYYY HH:mm");
            },
          },
          {
            headerName: "Date Processed",
            cellRenderer: (data) => {
              return moment(data.data.dateProcessed).format("MM-DD-YYYY HH:mm");
            },
          },
        ],
      },
    ];
    this.defaultColDef = {
      width: 150,
      editable: false,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
    };
    this.defaultColGroupDef = { marryChildren: true };
    this.columnTypes = {
      dateColumn: {
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            var dateParts = cellValue.split("/");
            var day = Number(dateParts[0]);
            var month = Number(dateParts[1]) - 1;
            var year = Number(dateParts[2]);
            var cellDate = new Date(year, month, day);
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
      statusColumn: {
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          cellHeight: 50,
          values: ["true", "false"],
        },
        editable: true,
        filter: true,
      },
      nonEditableColumn: { editable: false },
    };

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
    this.transactionService.getAllTransaction().subscribe(
      (transactions) => {
        this.rowData = transactions;
      },
      (error) => {
        this.toastr.error("Something went wrong");
      }
    );
  }

  onCellValueChanged(params) {
    this.toastr.info("Updating changed transaction.. ");
    let updatedTransaction: Transaction = params.data;
    if (params.newValue == "" || params.newValue == null) {
      this.toastr.warning("Field cannot be empty!");
      return false;
    }
    let changedField = params.colDef.field;

    if (changedField == "isHold" || changedField == "isPaidOut") {
      const newVal = `${params.newValue}`;
      updatedTransaction[`${changedField}`] = newVal == "true";
    }

    const transactionForUpdate: TransactionForUpdate = {
      isHold: updatedTransaction.isHold,
      isPaidOut: updatedTransaction.isPaidOut,
      status: updatedTransaction.status,
      statusDescription: updatedTransaction.statusDescription,
      dateProcessed: updatedTransaction.dateProcessed,
    };

    this.transactionService
      .updateTransaction(updatedTransaction.id, transactionForUpdate)
      .subscribe(
        (_) => {
          this.toastr.success("User update effected!");
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
    this.transactionDetailModel = this.gridApi.getSelectedRows()[0];
  }

  pullReport() {
    this.toastr.info("Generating Report..");
    return this.reportService
      .getMonthlyTransactionReport(this.reportQueryDate)
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
    saveAs(blob, "Transaction_Report.xlsx");
  }
}
