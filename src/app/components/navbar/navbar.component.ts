import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GetDataService} from '../../shared/get-data.service';
import {AuthService} from '../auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  userData;

  constructor(private getData: GetDataService, private auth: AuthService, private router: Router) {
    router.events.subscribe((_) => {
      this.isLogged = this.auth.checkAuth();
      if (this.auth.getToken() !== '') {
        this.userData = jwt_decode(this.auth.getToken());
      }
    });
  }


  ngOnInit() {
    if (this.auth.getToken() !== '') {
      this.userData = jwt_decode(this.auth.getToken());
    }
    this.isLogged = this.auth.checkAuth();
  }

  querySearch(element) {
    let searchSelector = document.querySelectorAll('.search-items');
    if (element.value.length >= 2) {
      searchSelector = document.querySelectorAll('.search-items');
      searchSelector.forEach((node) => {
        node.parentElement.removeChild(node);
      });
      this.getData.searchQuery(element.value).subscribe((res) => {
        // @ts-ignore
        if ([...res].length !== 0) {
          const box = document.querySelector('.search-query');
          // @ts-ignore
          [...res].forEach((item, i) => {
            const search = document.createElement('div');
            search.classList.add('search-items');
            search.innerText = item.title;
            search.addEventListener('click', () => {
              this.navigate('movie/' + item._id);
              element.value = '';
              searchSelector = document.querySelectorAll('.search-items');
              searchSelector.forEach((node) => {
                node.parentElement.removeChild(node);
              });
            });
            box.appendChild(search);
          });
        }
      });
    } else {
      searchSelector = document.querySelectorAll('.search-items');
      searchSelector.forEach((node) => {
        node.parentElement.removeChild(node);
      });
    }
  }

  signout() {
    this.auth.signOut();
    this.isLogged = false;
    this.userData = undefined;
  }

  navigate(to) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([to]));
  }

}
