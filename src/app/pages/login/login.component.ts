import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {LoginArg} from '../../types';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  formValues: LoginArg = {
    name: '',
    password: ''
  };

  constructor(private router: Router, private accountServe: AccountService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.accountServe.login(form.value).subscribe(({ user, token }) => {
        localStorage.setItem('h-auth', token);
        alert('登陆成功');
        this.router.navigateByUrl('/home/heroes');
      });
    }
  }
}
