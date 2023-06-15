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
  
  deleteProduct(id: string): void {
    this._productService.deleteProduct(id).subscribe({
      next: () => this.fetchProducts()
    });
  }
  
  private fetchProducts(): void {
    this.products = this._productService.getProducts();
  }
 }