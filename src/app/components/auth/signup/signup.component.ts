import {Component, OnInit} from '@angular/core';
import * as crypto from 'crypto-js';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  createUser(data) {
    data = crypto.AES.encrypt(JSON.stringify(data), environment.DECRYPTKEY,
      {
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
      });
    data = data.toString();
    data = {data};
    this.authService.createUser(data).subscribe((response) => {
      this.router.navigateByUrl('');
    });
  }
}
