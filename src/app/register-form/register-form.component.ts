import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private _router = inject(Router);
  private api = inject(ApiServiceService);
  registerForm: FormGroup;
  constructor(private form: FormBuilder) {
    this.registerForm = this.form.group({
      email: '',
      password: ''
    });
  }

  register() {
    const { email, password } = this.registerForm.value;
    this.api.createUser({ email, password }).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.goToProducts();
    });
  }

  goToProducts() {
    this._router.navigate(['/products']);
  }
  goToLogin() {
    this._router.navigate(['/login']);
  }
}
