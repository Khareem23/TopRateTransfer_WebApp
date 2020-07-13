import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, delay } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../_models/User";
import { UserForUpdate } from "../_models/UserForUpdate";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = `${environment.apiHost}/Customer`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllCustomers`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getTotalRegisteredUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getTotalRegisteredUsers`);
  }

  getTotalUsersMonthly(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getTotalUsersMonthly`);
  }

  updateUser(payload: UserForUpdate): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/updateByAdmin/${payload.id}`,
      payload
    );
  }
}
