import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  baseUrl = `${environment.apiHost}`;

  constructor(private http: HttpClient) {}

  getMonthlyTransactionReport(dateQuery: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/Transaction/ExportTransactionReportByMonth/${dateQuery}`,
      { responseType: "blob" as "json" }
    );
  }

  getAustracTransactionReport(
    fromDate: string,
    toDate: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/Transaction/ExportAustracReportByDateRange/${fromDate}/${toDate}`,
      { responseType: "blob" as "json" }
    );
  }
}
