import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Product } from '../model/product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-table-of-products',
  standalone: true,
  imports: [UpperCasePipe,CurrencyPipe,ReactiveFormsModule],
  templateUrl: './table-of-products.component.html',
  styleUrl: './table-of-products.component.css',
})
export class TableOfProductsComponent {
  private _apiService = inject(ApiServiceService);
  products: Product[] = [];
  private _router = inject(Router);
  private token: string | null = null;
  private productToUpdate: Product | undefined = undefined;
  productForm: FormGroup;
  public h2 = "Agregar";
  constructor(@Inject(PLATFORM_ID) private platformId: object,private form: FormBuilder) {
    this.productForm = this.form.group({
      name: '',
      price: '',
      description: '',
      stock: ''
    });
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
    return this._apiService.deleteProduct(id, this.token ?? '').subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  addProduct(product: Product) {
    return this._apiService.addProduct(product, this.token ?? '').subscribe((data: any) => {
      this.products.push(data);
    });
  }

  updateProduct(product: Product) {
    return this._apiService.updateProduct(product, this.token ?? '').subscribe(() => {
      this.products = this.products.map((p) => (p.id === product.id ? product : p));
    });
  }

  sendProduct() {
    const { name, price, description, stock } = this.productForm.value;
    const id = this.productToUpdate?.id;
    if(this.productToUpdate) {
      this.updateProduct({id, name, price, description, stock } as Product);
    } else {
      this.addProduct({ name, price, description, stock } as Product);
    }
    this.closeModal();
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  openModal(id?: number) {
      const modal = document.querySelector('#myModal') as HTMLElement;
      if (id) {
        this.productToUpdate = this.products.find((product) => product.id === id);
        this.h2 = "Editar";
        if (this.productToUpdate) {
          this.productForm.setValue({
            name: this.productToUpdate.name,
            price: this.productToUpdate.price,
            description: this.productToUpdate.description,
            stock: this.productToUpdate.stock
          });
        }
      }else{
        this.productToUpdate = undefined;
        this.productForm.reset();
        this.h2 = "Agregar";
      }
      if (modal) {
        modal.style.display = 'block';
      }
    }

    closeModal() {
    const modal = document.querySelector('#myModal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }

  
}
