import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {CommentsListComponent} from '../components/comments-list/comments-list.component';
import {SigninComponent} from '../components/auth/signin/signin.component';
import {SignupComponent} from '../components/auth/signup/signup.component';
import {AddMovieComponent} from '../components/add-movie/add-movie.component';
import {MovieComponent} from '../components/movie/movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
  {path: 'movie/:id', component: MovieComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'add-movie', component: AddMovieComponent},
  {path: 'comments', component: CommentsListComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule {
}
