import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { UserService } from "../_services/user.service";

import * as userActions from "./_state/action";
import * as fromUser from "./_state/reducer";
import { Store } from "@ngrx/store";
import { User } from "../_models/User";
import * as moment from "moment";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  defaultColGroupDef;
  columnTypes;
  rowData = null;
  editType;
  gridOptions;

  users: User[] = [];
  isLoaded = false;
  isLoading = false;

  overlayLoadingTemplate;
  overlayNoRowsTemplate;

  constructor(
    private http: HttpClient,
    private store: Store<fromUser.AppState>
  ) {
    // AG-Grid Datatable definition
    this.columnDefs = [
      {
        headerName: "Id",
        field: "id",
      },
      {
        headerName: "Fullname",
        field: "fullname",
      },
      {
        headerName: "Verification Status",
        field: "isIdVerification",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          cellHeight: 50,
          values: ["true", "false"],
        },
      },
      {
        headerName: "Age",
        field: "age",
        type: "numberColumn",
      },
      ,
      {
        headerName: "Gender",
        field: "gender",
      },
      {
        headerName: "Date Joined",
        field: "createdDate",
        type: "dateColumn",
        width: 170,
        cellRenderer: (data) => {
          return moment(data.createdDate).format("MM-DD-YYYY HH:mm");
        },
      },
      {
        headerName: "Address",
        groupId: "addressGroup",
        children: [
          {
            headerName: "City",
            field: "city",
            type: "addressColumn",
          },
          {
            headerName: "Country",
            field: "country",
            type: "addressColumn",
          },
        ],
      },
    ];
    this.defaultColDef = {
      width: 150,
      editable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
    };
    this.defaultColGroupDef = { marryChildren: true };
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: "agNumberColumnFilter",
      },
      addressColumn: {
        width: 150,
        columnGroupShow: "open",
        filter: true,
      },
      nonEditableColumn: { editable: false },
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
    };
    // this.editType = "fullRow";
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
  }

  ngOnInit() {
    this.store.dispatch(new userActions.GetAll());

    // this.store
    //   .select(fromUser.getUsersLoaded)
    //   .subscribe((isLoaded) => (this.isLoaded = isLoaded));
    // this.store
    //   .select(fromUser.getUsersLoaded)
    //   .subscribe((isLoading) => (this.isLoading = isLoading));

    // if (!this.isLoaded && this.isLoading) {
    //   this.gridApi.showLoadingOverlay();
    // } else if (this.isLoaded && !this.isLoading) {
    //   if (this.rowData == null) {
    //     this.gridApi.showNoRowsOverlay();
    //   }
    // }
  }

  onCellValueChanged(params) {
    console.log(params);
    console.log(params.colDef.field);
    console.log(params.oldValue);
    console.log(params.newValue);
  }

  onGridReady(params) {
    console.log(params);
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = true;
    this.gridColumnApi = params.columnApi;
    this.store.select(fromUser.getUsers).subscribe((state) => {
      // this.rowData = state;
      console.log(state);
    });

    // this.http
    //   .get(
    //     "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
    //   )
    //   .subscribe((data) => {
    //     this.rowData = data;
    //   });
  }
}
