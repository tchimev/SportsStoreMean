import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private url:string = 'http://localhost:5200';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.url}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(`${this.url}/products/${id}`);
  }
}
