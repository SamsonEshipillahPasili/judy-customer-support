import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {LoginRequest} from '../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isLoading: boolean = false;
  errorMsg: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public async login(): Promise<void> {
    if (!this.loginForm.valid){
      return;
    }

    if (this.isLoading) {
      return;
    }

    this.errorMsg = '';
    this.isLoading = true;

    const loginRequest: LoginRequest = {
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || ''
    };

    const success = await this.loginService.login(loginRequest)
    this.isLoading = false;
    if (success) {
      await this.router.navigate(['/']);
    } else {
      this.errorMsg = 'Invalid Credentials';
    }
  }
}
