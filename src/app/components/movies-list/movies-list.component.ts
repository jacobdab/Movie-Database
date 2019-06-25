import {Component, OnInit} from '@angular/core';
import {GetDataService} from '../../shared/get-data.service';
import {MoviesModel} from '../../shared/model/movies.model';
import {PostDataService} from '../../shared/post-data.service';
import * as jwt_decode from 'jwt-decode';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  moviesList: MoviesModel[] = [];
  user;

  constructor(private getData: GetDataService, private postData: PostDataService, private auth: AuthService) {
  }

  ngOnInit() {
    this.getMoviesList();
    if (this.auth.getToken()) {
      this.user = jwt_decode(this.auth.getToken());
    }
  }

  getMoviesList() {
    this.getData.getMoviesList().subscribe((response) => {
      this.moviesList = response;
    });
  }

  deleteMovie(event, movieId) {
    event.stopPropagation();
    this.postData.deleteMovie(movieId).subscribe((response) => {
      console.log(response);
      this.getMoviesList();
    });
  }
}
