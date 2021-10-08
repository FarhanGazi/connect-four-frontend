import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';
  public url = 'http://localhost:3000'

  constructor(private http: HttpClient) {
    console.log('User service instantiated');

    this.token = localStorage.getItem('postmessages_token');
    if (!this.token || this.token.length < 1) {
      console.log("No token found in local storage");
      this.token = ""
    } else {
      console.log("JWT loaded from local storage.")
    }
  }

  public login(params: any = { email: "", password: "" }): Observable<any> {

    console.log('Login: ' + params['email'] + ' ' + params['password']);
    const options = {
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa(params['email'] + ':' + params['password']),
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.http.get(`${this.url}/auth/login`, options).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
        this.token = data.token;
        localStorage.setItem('connectfour_token', this.token);
      })
    );
  }

  public signup(params: any = {}): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${this.url}/auth/signin`, params, options).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((error: HttpErrorResponse) => { return throwError('Something bad happened; please try again later.'); })
    )

  }

  get_token() {
    return this.token;
  }
}
