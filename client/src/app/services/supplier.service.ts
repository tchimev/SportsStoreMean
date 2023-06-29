import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
private url:string = 'http://localhost:5200';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getSuppliers(): Observable<Supplier[]> {
    return this._httpClient.get<Supplier[]>(`${this.url}/suppliers`);
  }
}
