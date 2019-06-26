import {Component, OnInit} from '@angular/core';
import {GetDataService} from '../../shared/get-data.service';
import {PostDataService} from '../../shared/post-data.service';
import * as jwt_decode from 'jwt-decode';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  commentsList;
  user;

  constructor(private getData: GetDataService, private postData: PostDataService, private auth: AuthService) {
  }

  ngOnInit() {
    this.getData.getComments().subscribe((response) => {
      // @ts-ignore
      this.commentsList = response;
    });
    if (this.auth.getToken()) {
      this.user = jwt_decode(this.auth.getToken());
    }
  }

  deleteComment(commentId, movieId) {
    this.postData.deleteComment(commentId, movieId).subscribe((_) => {
      this.ngOnInit();
    });
  }
}
