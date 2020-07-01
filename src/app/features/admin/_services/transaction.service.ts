import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Transaction } from "../_models/Transaction";
import { TransactionForUpdate } from "../_models/TransactionForUpdate";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  baseUrl = `${environment.apiHost}/Transaction`;

  constructor(private http: HttpClient) {}

  getTotalTransactionCount(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/getTotalNumberOfTransactions`
    );
  }

  getAllTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/getAllTransactions`);
  }

  getTotalAmountProcessed(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getTotalAmountProcessed`);
  }

  getTotalTransactionForCurrentMonth(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/getTotalTransactionAmountForCurrentMonth`
    );
  }

  updateTransaction(
    transactionId: number,
    payload: TransactionForUpdate
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/updateTransaction/${transactionId}`,
      payload
    );
  }
}
