import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private httpClient: HttpClient) {}
  getAllProducts(): Observable<Iproduct[]> {
    // console.log(
    //   this.httpClient.get<Iproduct[]>(`${environment.baseURL}/products`)
    // );

    return this.httpClient.get<Iproduct[]>(`${environment.baseURL}/products`);
  }
  getProductById(id: string | null): Observable<Iproduct> {
    return this.httpClient.get<Iproduct>(
      `${environment.baseURL}/products/${id}`
    );
  }
  getProductByCatId(catId: number): Observable<Iproduct[]> {
    return this.httpClient.get<Iproduct[]>(
      `${environment.baseURL}/products?catId=${catId}`
    );
  }
  addNewProduct(prd: Iproduct): Observable<Iproduct> {
    return this.httpClient
      .post<Iproduct>(`${environment.baseURL}/products`, JSON.stringify(prd))
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            return new Error('Error in add new product');
          });
        })
      );
  }
  EditProduct(prdId: number, prd: Iproduct): Observable<Iproduct> {
    return this.httpClient
      .patch<Iproduct>(
        `${environment.baseURL}/products/${prdId}`,
        JSON.stringify(prd)
      )
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            return new Error('Error in edit new product');
          });
        })
      );
  }
  deleteProduct(prdId: number): Observable<Iproduct> {
    return this.httpClient
      .delete<Iproduct>(`${environment.baseURL}/products/${prdId}`)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            return new Error('Error in edit new product');
          });
        })
      );
  }
}
