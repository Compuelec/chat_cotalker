import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {LoginI} from '../../interface/login.interface';

import {Router} from '@angular/router';
import {Login_ResponseI} from '../../interface/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private login: LoginService, private router: Router) {}

  errorStatus = false;
  error = '';

  errorMsj = '¡Usuario y/o contraseña incorrectos!';

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['messages']);
    }
  }

  onLogin(form: LoginI) {
    this.login.loginByEmail(form).subscribe(
      data => {
        const dataResponse: Login_ResponseI = data;

        if (dataResponse.token !== '') {
          localStorage.setItem('token', dataResponse.token!);
          this.router.navigate(['messages']);
        }
      },
      error => {
        this.error = error;
        this.errorStatus = true;
      }
    );
  }
}
