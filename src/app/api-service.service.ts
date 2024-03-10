import { Injectable, inject } from '@angular/core';
import { Product } from './model/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl = 'https://node-auth-jwt-api-rest-production.up.railway.app';
  private _http= inject(HttpClient);
  constructor() { }

  getProducts(token: string):Observable <Product[]> {
    return this._http.get<Product[]>(`${this.baseUrl}/products`, { headers: { Authorization: `Bearer ${token}` } });
  }

  getProduct(id: string,token: string): Observable <Product> {
    return this._http.get<Product>(`${this.baseUrl}/products/${id}`,{ headers: { Authorization: `Bearer ${token}` } });
  }

  createUser(user: User) {
    return this._http.post(`${this.baseUrl}/auth/register`, user);
  }

  loginUser(user: User) {
    return this._http.post(`${this.baseUrl}/auth/login`, user);
  }

  deleteProduct(id: number,token: string) {
    return this._http.delete(`${this.baseUrl}/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  }

  addProduct(product:  Product,token: string) {
    return this._http.post(`${this.baseUrl}/products/`, product, { headers: { Authorization: `Bearer ${token}` } });
  }

  updateProduct(product: Product,token: string) {
    return this._http.put(`${this.baseUrl}/products/${product.id}`, product, { headers: { Authorization: `Bearer ${token}` } });
  }
}
