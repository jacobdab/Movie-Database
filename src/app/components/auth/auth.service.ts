import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {PostDataService} from '../../shared/post-data.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private postData: PostDataService, private cookieService: CookieService, private http: HttpClient) {
  }

  createUser(user) {
    return this.http.post('http://localhost:3000/user/signup', user)
      .pipe(map((response: Response) => {
        console.log(response);
        this.setToken(response);
        return response;
      }));
  }

  setToken(response) {
    this.cookieService.set('currentUser', response.token, 0.2);
  }

  getToken() {
    return this.cookieService.get('currentUser');
  }


  signIn(user) {
    return this.http.post('http://localhost:3000/user/signin', user)
      .pipe(map((response: Response) => {
        this.setToken(response);
      }));
  }

  signOut() {
    return this.cookieService.delete('currentUser');
  }

  checkAuth() {
    if (this.cookieService.get('currentUser') !== '') {
      return true;
    }
    return false;
  }
}
