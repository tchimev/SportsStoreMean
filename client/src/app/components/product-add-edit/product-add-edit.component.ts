import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { Supplier } from "src/app/models/supplier.model";
import { ProductService } from "src/app/services/product.service";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
  selector: "app-product-add-edit",
  templateUrl: "./product-add-edit.component.html",
  styles: [],
})
export class ProductAddEditComponent implements OnInit {
  public productId: string | null;
  public suppliers: Supplier[] = [];

  public form: FormGroup<any> = new FormGroup<any>({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _productService: ProductService,
    private _supplierService: SupplierService,
    private _fb: FormBuilder
  ) {
    this.productId = this.route.snapshot.paramMap.get("id");

    let product: Product = {};
    this.form = this._fb.group({
      name: [product.name, Validators.required],
      category: [product.category],
      description: [product.description],
      price: [product.price],
      supplierName: [product.supplier?.name, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchProduct();
    this._supplierService.getSuppliers().subscribe({
      next: (s) => {
        this.suppliers = s;
      },
    });
  }

  private fetchProduct(): void {
    if (this.productId) {
      this._productService.getProduct(this.productId).subscribe({
        next: (p) => {
          this.form.patchValue(p);
        },
      });
    }
  }

  private updateProduct(product: Product) {
    this._productService
      .updateProduct(this.productId || "", product)
      .subscribe({
        next: () => {
          this.router.navigate(["/products"]);
        },
        error: (error) => {
          alert("Failed to update product");
          console.error(error);
        },
      });
  }

  private createProduct(product: Product) {
    this._productService.createProduct(product).subscribe({
      next: () => {
        this.router.navigate(["/products"]);
      },
      error: (error) => {
        alert("Failed to create product");
        console.error(error);
      },
    });
  }

  public submitForm(product: Product) {
    if (this.productId) {
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }
}
