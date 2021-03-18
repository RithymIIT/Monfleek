import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(data): Observable<any> {
    return this.http.post("authenticateSeller", data);
  }
  getAllCategories(data): Observable<any> {
    return this.http.post("getAllCategories", data);
  }
  addProduct(data): Observable<any> {
    return this.http.post("addProduct", data);
  }
  //
}
