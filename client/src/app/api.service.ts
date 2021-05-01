import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Pedidos } from './pedidos';
import { Chart } from './chart';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${apiUrl}`)
      .pipe(
        tap(pedidos => console.log('fetched pedidos')),
        catchError(this.handleError('getPedidos', []))
      );
  }

  getPedidosById(id: string): Observable<Pedidos> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Pedidos>(url).pipe(
      tap(_ => console.log(`fetched pedidos id=${id}`)),
      catchError(this.handleError<Pedidos>(`getPedidosById id=${id}`))
    );
  }

  addPedidos(pedidos: Pedidos): Observable<Pedidos> {
    return this.http.post<Pedidos>(apiUrl, pedidos, httpOptions).pipe(
      tap((s: Pedidos) => console.log(`added pedidos w/ id=${s._id}`)),
      catchError(this.handleError<Pedidos>('addPedidos'))
    );
  }

  updatePedidos(id: string, pedidos: Pedidos): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, pedidos, httpOptions).pipe(
      tap(_ => console.log(`updated pedidos id=${id}`)),
      catchError(this.handleError<any>('updatePedidos'))
    );
  }

  deletePedidos(id: string): Observable<Pedidos> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Pedidos>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted pedidos id=${id}`)),
      catchError(this.handleError<Pedidos>('deletePedidos'))
    );
  }

  getChart(): Observable<Chart> {
    const url = `${apiUrl}/itempedidos`;
    return this.http.get<Chart>(url).pipe(
      tap(_ => console.log(`fetched chart data`)),
      catchError(this.handleError<Chart>(`getChart data`))
    );
  }
}
