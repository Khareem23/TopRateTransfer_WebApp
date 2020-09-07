import { Component, OnInit } from "@angular/core";

import { UserService } from "../_services/user.service";

import { User } from "../_models/User";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { UserForUpdate } from "../_models/UserForUpdate";
import { Observable } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  userModel: User;
  userJoinedDate;

  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  defaultColGroupDef;
  columnTypes;
  rowData = null;
  editType;
  gridOptions;
  rowSelection;

  users: User[] = [];
  isLoaded = false;
  isLoading = false;

  overlayLoadingTemplate;
  overlayNoRowsTemplate;

  constructor(private userService: UserService, private toastr: ToastrService) {
    // AG-Grid Datatable definition
    this.columnDefs = [
      {
        headerName: "Id",
        field: "id",
        checkboxSelection: true,
      },
      {
        headerName: "Names",
        groupId: "namesGroup",
        children: [
          {
            headerName: "First Name",
            field: "firstName",
            editable: true,
          },
          {
            headerName: "Last Name",
            field: "lastName",
            editable: true,
          },
        ],
      },
      {
        headerName: "Email",
        field: "email",
        editable: true,
      },
      {
        headerName: "Date of Birth",
        type: "dateColumn",
        width: 170,
        cellRenderer: (data) => {
          console.log(data);
          return moment(data.data.dateOfBirth).format("MM-DD-YYYY");
        },
      },
      {
        headerName: "Verifications",
        groupId: "verificationGroup",
        children: [
          {
            headerName: "Activation Status",
            field: "isActivated",
            type: "verificationColumn",
          },
          {
            headerName: "Facial Verification",
            field: "isFacialVerification",
            type: "verificationColumn",
          },
          {
            headerName: "ID Verification",
            field: "isIdVerification",
            type: "verificationColumn",
          },
        ],
      },
      {
        headerName: "Gender",
        field: "gender",
      },
      {
        headerName: "Invitee",
        groupId: "inviteeGroup",
        children: [
          {
            headerName: "URL",
            field: "inviteUrl",
          },
          {
            headerName: "Inviter NameID",
            field: "inviterNameID",
          },
        ],
      },
      {
        headerName: "Date Joined",
        field: "createdDate",
        type: "dateColumn",
        width: 170,
        cellRenderer: (data) => {
          return moment(data.data.createdDate).format("MM-DD-YYYY HH:mm");
        },
      },
      {
        headerName: "Address",
        groupId: "addressGroup",
        children: [
          {
            headerName: "Home Address",
            field: "address",
            type: "addressColumn",
          },
          {
            headerName: "City",
            field: "city",
            type: "addressColumn",
          },
          {
            headerName: "State",
            field: "state",
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
      editable: false,
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
        editable: true,
      },
      verificationColumn: {
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          cellHeight: 50,
          values: ["true", "false"],
        },
        editable: true,
        filter: true,
        width: 150,
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
    this.rowSelection = "single";
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while fetching users</span>';
  }

  ngOnInit() {}

  onCellValueChanged(params) {
    this.toastr.info("Updating changed user.. ");
    let updatedUser: UserForUpdate = params.data;
    let changedField = params.colDef.field;

    if (
      changedField == "isActivated" ||
      changedField == "isFacialVerification" ||
      changedField == "isIdVerification"
    ) {
      const newVal = `${params.newValue}`;
      updatedUser[`${changedField}`] = newVal == "true";
    }
    console.log(updatedUser);
    updatedUser = this.buildUserForUpdateModel(updatedUser);

    this.updateUser(updatedUser).subscribe(
      (_) => {
        this.toastr.success("User update effected!");
      },
      (error) => {
        this.toastr.error("Something went wrong");
      }
    );
  }

  buildUserForUpdateModel(updatedUser: UserForUpdate): UserForUpdate {
    let userForUpdate: UserForUpdate = {
      id: updatedUser.id,
      phoneNumber: updatedUser.phoneNumber,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      country: updatedUser.country,
      isActivated: updatedUser.isActivated,
      isFacialVerification: updatedUser.isFacialVerification,
      isIdVerification: updatedUser.isIdVerification,
      dateOfBirth: updatedUser.dateOfBirth,
      gender: updatedUser.gender,
      postalCode: updatedUser.postalCode,
      idType: updatedUser.idType,
      idCardNumber: updatedUser.idCardNumber,
      idCardIssuer: updatedUser.idCardIssuer,
      role: updatedUser.role,
    };

    return userForUpdate;
  }

  updateUser(updatedUser: UserForUpdate): Observable<any> {
    return this.userService.updateUser(updatedUser);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = true;
    this.gridColumnApi = params.columnApi;
    this.userService.getUsers().subscribe(
      (users) => {
        this.rowData = users;
      },
      (error) => {
        this.toastr.error("Something went wrong");
      }
    );
  }

  rowSelected() {
    return this.gridApi && this.gridApi.getSelectedRows().length > 0;
  }

  displayViewForSelectedRow() {
    this.userModel = this.gridApi.getSelectedRows()[0];
    this.userJoinedDate = moment(this.userModel.createdDate).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
  }
}
