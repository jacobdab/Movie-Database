import {Component, OnInit} from '@angular/core';
import {GetDataService} from '../../shared/get-data.service';
import {ActivatedRoute} from '@angular/router';
import {MoviesModel} from '../../shared/model/movies.model';
import {PostDataService} from '../../shared/post-data.service';
import * as jwt_decode from 'jwt-decode';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: MoviesModel;
  comments = [];
  show = false;
  movieId;
  user;

  constructor(private getData: GetDataService, private postData: PostDataService, private auth: AuthService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.movieId = this.route.snapshot.url[1].path;
    this.getData.getMovie(this.movieId).subscribe((response) => {
      this.movie = response;
      this.comments = response.comments;
    });
    if (this.auth.getToken()) {
      this.user = jwt_decode(this.auth.getToken());
    }
  }

  addComment(commentItem) {
    this.postData.addComment(commentItem.value, this.movieId, this.user).subscribe((response) => {
      commentItem.control.setValue('');
      commentItem.control.touched = false;
      this.ngOnInit();
    });
  }

  deleteComment(commentId) {
    // @ts-ignore
    this.postData.deleteComment(commentId, this.movie._id).subscribe((_) => {
      this.ngOnInit();
    });
  }
}
