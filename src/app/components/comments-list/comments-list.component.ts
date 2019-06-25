import {Component, OnInit} from '@angular/core';
import {GetDataService} from '../../shared/get-data.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  commentsList;
  movieList;

  constructor(private getData: GetDataService) {
  }

  ngOnInit() {
    this.getData.getComments().subscribe((response) => {
      // @ts-ignore
      this.commentsList = response.comments;
      // @ts-ignore
      this.movieList = response.movie;
    });
  }

}
