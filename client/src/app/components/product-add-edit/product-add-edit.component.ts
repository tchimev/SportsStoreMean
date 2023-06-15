import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styles: [
  ]
})
export class ProductAddEditComponent implements OnInit {
  public product: Product = {};
  public productId: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _productService: ProductService) { 

    this.productId = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.fetchProduct();
  }
    
  private fetchProduct(): void {
    if (this.productId) {
        this._productService.getProduct(this.productId).subscribe({
            next: (p) => {
                this.product = p;
            }});
    }
  }

  editProduct(product: Product) {
    this._productService.updateProduct(product)
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          alert('Failed to update product');
          console.error(error);
        }
      })
  }

  createProduct(product: Product) {
    this._productService.createProduct(product)
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          alert("Failed to create product");
          console.error(error);
        }
      });
  }
 }