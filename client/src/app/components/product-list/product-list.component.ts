import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {
  public products: Observable<Product[]> = new Observable();
  
  constructor(private _productService: ProductService) { }
  
  ngOnInit(): void {
    this.fetchProducts();
  }
  
  // deleteEmployee(id: string): void {
  //   this.employeesService.deleteEmployee(id).subscribe({
  //     next: () => this.fetchEmployees()
  //   });
  // }
  
  private fetchProducts(): void {
    this.products = this._productService.getProducts();
  }
 }