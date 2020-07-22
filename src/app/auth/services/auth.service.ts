import { environment } from "./../../../environments/environment";
import { ILogin } from "../models/ILogin";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { UserToRegister } from "../models/UserToRegister";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = `${environment.apiHost}/auth`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  loggedInUser;

  constructor(private http: HttpClient) {}

  registerUser(referralId: string, payload: UserToRegister): Observable<any> {
    const url = `${this.baseUrl}/register/referralCode/${referralId}`;
    console.log(url);
    return this.http.post(url, payload);
  }

  authenticate(payload: ILogin): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, payload);
  }

  doesEmailExist(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/checkEmailExist/${email}`;
    return this.http.get<boolean>(url);
  }

  doesPhoneNumberExist(phone: string): Observable<boolean> {
    const url = `${this.baseUrl}/checkPhoneNumberExist/${phone}`;
    return this.http.get<boolean>(url);
  }

  doesReferralCodeExist(code: string): Observable<boolean> {
    const url = `${this.baseUrl}/checkReferralCodeValidity/${code}`;
    return this.http.get<boolean>(url);
  }

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  getToken(): string {
    const token = localStorage.getItem("token") || "";
    return token;
  }

  isUserMnagager(token: string): boolean {
    const claims = this.decodeToken(token);

    if (claims.role != "Manager") return false;

    return true;
  }

  isTokenExpired(token: string): boolean {
    const jwtHelper = new JwtHelperService();

    const claims = this.decodeToken(token);

    if (claims.exp < new Date().getTime() / 1000) {
      this.destroyToken();
      return true;
    } else {
      return false;
    }
  }

  saveToken(token: string) {
    const tokenInStorage = localStorage.getItem("token") || null;
    if (tokenInStorage === null) {
      localStorage.setItem("token", token);
    }
  }

  destroyToken(): void {
    localStorage.removeItem("token");
  }

  isAuthenticatedAsManager(): boolean {
    // get token
    const token = this.getToken();

    if (token === "") return false;

    // check validity
    if (this.isTokenExpired(token)) {
      return false;
    }

    //assert role == manager
    if (!this.isUserMnagager(token)) {
      console.log("not a manager");
      return false;
    }
    return true;
  }
}
