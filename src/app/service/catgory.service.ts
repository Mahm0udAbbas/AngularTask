import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../models/icategory';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CatgoryService {
  constructor(private httpClient: HttpClient) {}
  getAllCateogories(): Observable<Icategory[]> {
    return this.httpClient.get<Icategory[]>(
      `${environment.baseURL}/categories`
    );
  }
}
