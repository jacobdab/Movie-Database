import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MoviesListComponent} from './components/movies-list/movies-list.component';
import {HomeComponent} from './components/home/home.component';
import {RoutesModule} from './routing/routes.module';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {CommentsListComponent} from './components/comments-list/comments-list.component';
import {SigninComponent} from './components/auth/signin/signin.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './components/auth/auth.service';
import {AddMovieComponent} from './components/add-movie/add-movie.component';
import {MovieComponent} from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CommentsListComponent,
    SigninComponent,
    SignupComponent,
    AddMovieComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutesModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
