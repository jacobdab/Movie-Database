import {Component, OnInit} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import * as crypto from 'crypto-js';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user;
  isLogged = false;


  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login(data) {
    const signButton = document.querySelector('#signButton');
    data = crypto.AES.encrypt(JSON.stringify(data), environment.DECRYPTKEY,
      {
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
      });
    data = data.toString();
    data = {data};
    this.auth.signIn(data).subscribe(
      promise => {
        this.user = jwt_decode(this.auth.getToken());
        signButton.classList.remove('btn-primary');
        signButton.classList.add('btn-success');
        signButton.textContent = 'Welcome';
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 1500);
      },
      error => {
        this.isLogged = false;
        signButton.classList.remove('btn-primary');
        signButton.classList.add('btn-danger');
        signButton.textContent = 'Wrong creditentials';
        setTimeout(() => {
          signButton.classList.remove('btn-danger');
          signButton.classList.add('btn-primary');
          signButton.textContent = 'Sign In';
        }, 1500);
      }
    );
  }
}
