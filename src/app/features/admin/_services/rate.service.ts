import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, delay } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Rate } from "../_models/Rate";

@Injectable({
  providedIn: "root",
})
export class RateService {
  baseUrl = `${environment.apiHost}/Rate`;

  constructor(private http: HttpClient) {}

  createRate(payload: Rate): Observable<Rate> {
    return this.http.post<Rate>(`${this.baseUrl}`, payload);
  }

  getRate(): Observable<Rate> {
    return this.http.get<Rate>(`${this.baseUrl}/getRate`);
  }

  updateRate(payload: Rate): Observable<Rate> {
    return this.http.put<Rate>(`${this.baseUrl}/${payload.id}`, payload);
  }
}
