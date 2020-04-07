import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../configurations';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient) {}

  create(shoppingList: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };
    return this.http.post<any>(
      `${config.URL}/shopping-list/create`,
      shoppingList,
      httpOptions
    );
  }

  getAll(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };

    return this.http.get<any>(
      `${config.URL}/shopping-list/getAll`,
      httpOptions
    );
  }

  getOwner(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };
    return this.http.get<any>(
      `${config.URL}/shopping-list/getMyShoppingLists/${id}`,
      httpOptions
    );
  }

  getVolunteer(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };

    return this.http.get<any>(
      `${config.URL}/shopping-list/getMyVolunteerShoppingLists/${id}`,
      httpOptions
    );
  }

  deleteShoppingList(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };
    return this.http.delete<any>(
      `${config.URL}/shopping-list/delete/${id}`,
      httpOptions
    );
  }
}
