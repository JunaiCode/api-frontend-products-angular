import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Product } from '../model/product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-table-of-products',
  standalone: true,
  imports: [UpperCasePipe,CurrencyPipe],
  templateUrl: './table-of-products.component.html',
  styleUrl: './table-of-products.component.css',
})
export class TableOfProductsComponent {
  private _apiService = inject(ApiServiceService);
  products: Product[] = [];
  private _router = inject(Router);
  private token: string | null = null;
  
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
      this.getProducts().subscribe((data: Product[]) => {
        this.products = data;
      });
    }
  }

  getProducts() {
    return this._apiService.getProducts(this.token ?? '');
  }

  deleteProduct(id: number) {
    return this._apiService.deleteProduct(id, this.token ?? '');
  }

  addProduct(product: any) {
    return this._apiService.addProduct(product, this.token ?? '');
  }

  updateProduct(product: Product) {
    return this._apiService.updateProduct(product, this.token ?? '');
  }

  navigate(id: number) {
  this._router.navigate([`/products/${id}`]);
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

}
