import {Component, OnInit} from '@angular/core';
import {PostDataService} from '../../shared/post-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  error;

  constructor(private postData: PostDataService, private router: Router) {
  }

  ngOnInit() {
  }

  addMovie(formData) {
    // @ts-ignore
    this.postData.addMovie(formData).subscribe((response) => {
        this.error = null;
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.error = error.error;
      });


  }
}
