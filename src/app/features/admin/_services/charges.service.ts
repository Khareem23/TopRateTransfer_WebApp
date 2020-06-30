import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, delay } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Charge } from "../_models/Charge";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class ChargeService {
  baseUrl = `${environment.apiHost}/Charges`;
  constructor(private http: HttpClient) {}

  chargeForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    minAmount: new FormControl("", Validators.required),
    maxAmount: new FormControl("", Validators.required),
    charges: new FormControl("", Validators.required),
  });

  initializeFormGroup() {
    this.chargeForm.setValue({
      id: 0,
      minAmount: "",
      maxAmount: "",
      charges: "",
    });
  }

  createCharge(payload: Charge): Observable<Charge> {
    return this.http.post<Charge>(`${this.baseUrl}/createCharges`, payload);
  }

  updateCharge(payload: Charge): Observable<Charge> {
    return this.http.put<Charge>(
      `${this.baseUrl}/update/${payload.id}`,
      payload
    );
  }

  getCharge(amountToSend: number): Observable<Charge> {
    return this.http.get<Charge>(`${this.baseUrl}/getCharges/${amountToSend}`);
  }

  getAllCharges(): Observable<Charge[]> {
    return this.http.get<Charge[]>(`${this.baseUrl}/getAllCharges`);
  }

  removeCharge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCharges/${id}`);
  }
}
