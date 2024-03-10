import { Component, OnInit, inject } from '@angular/core';
import { Router} from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  private _router = inject(Router);
  private _apiService = inject(ApiServiceService);
  loginForm: FormGroup;
  constructor(private form: FormBuilder) {
    this.loginForm = this.form.group({
      email: '',
      password: ''
    });
   }

  goToProducts() {
    this._router.navigate(['/products']);
  }
  goToRegister() {
    this._router.navigate(['/register']);
  }

  login() {
    console.log(this.loginForm);
    const { email, password } = this.loginForm.value;
    this._apiService.loginUser({ email, password }).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.goToProducts();
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.goToProducts();
    }
  }
}
