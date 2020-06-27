import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, delay } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../_models/User";

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

  updateUser(payload: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${payload.id}`, payload);
  }
}
