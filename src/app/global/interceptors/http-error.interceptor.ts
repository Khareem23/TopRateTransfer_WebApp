import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError(
        (error: HttpErrorResponse): Observable<any> => {
          let errorMessage = "";
          if (error.error instanceof ErrorEvent) {
            // client side error
            errorMessage = `Error: ${error.message}`;
          } else {
            // server side error
            errorMessage = `${error.status}`;
          }

          return throwError(errorMessage);
        }
      )
    );
  }
}
