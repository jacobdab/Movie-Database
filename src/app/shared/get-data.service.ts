import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MoviesModel} from './model/movies.model';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {
  }


  getMoviesList(): Observable<MoviesModel[]> {
    return this.http.get<MoviesModel[]>('http://localhost:4004/api/');
  }

  getMovie(id): Observable<MoviesModel> {
    return this.http.get<MoviesModel>('http://localhost:4004/api/get-movie', {params: {id}});
  }

  getComments() {
    return this.http.get('http://localhost:4004/api/get-comments');
  }

  searchQuery(value) {
    return this.http.get('http://localhost:4004/api/search-query', {params: {name: value}});
  }
}
