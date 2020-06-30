import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MiscService {
  baseUrl = `${environment.apiHost}`;

  constructor(private http: HttpClient) {}

  getTotalTransactionCount(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/Transaction/getTotalNumberOfTransactions`
    );
  }

  getTotalAmountProcessed(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/Transaction/getTotalAmountProcessed`
    );
  }

  getTotalTransactionForCurrentMonth(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/Transaction/getTotalTransactionAmountForCurrentMonth`
    );
  }
}
