import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MoviesModel} from './model/movies.model';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private http: HttpClient) {
  }


  addMovie(formData): Observable<MoviesModel> {
    return this.http.post<MoviesModel>('http://localhost:4004/api/add-movie', {formData});
  }


  deleteMovie(movieId): Observable<MoviesModel> {
    return this.http.delete<MoviesModel>('http://localhost:4004/api/delete-movie/', {params: {movieId}});
  }

  addComment(comment, movieId, userId) {
    return this.http.post('http://localhost:4004/api/add-comment', {comment, movieId, userId});
  }

  deleteComment(commentId, movieId) {
    return this.http.delete('http://localhost:4004/api/delete-comment', {params: {commentId, movieId}});
  }
}
