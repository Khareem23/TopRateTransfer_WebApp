import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  private rowData;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "Athlete",
        field: "athlete",
      },
      {
        headerName: "Sport",
        field: "sport",
      },
      {
        headerName: "Age",
        field: "age",
        type: "numberColumn",
      },
      {
        headerName: "Year",
        field: "year",
        type: "numberColumn",
      },
      {
        headerName: "Date",
        field: "date",
        type: ["dateColumn", "nonEditableColumn"],
        width: 220,
      },
      {
        headerName: "Medals",
        groupId: "medalsGroup",
        children: [
          {
            headerName: "Gold",
            field: "gold",
            type: "medalColumn",
          },
          {
            headerName: "Silver",
            field: "silver",
            type: "medalColumn",
          },
          {
            headerName: "Bronze",
            field: "bronze",
            type: "medalColumn",
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
      medalColumn: {
        width: 100,
        columnGroupShow: "open",
        filter: false,
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
  }
  ngOnInit() {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
