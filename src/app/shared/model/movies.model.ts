export class MoviesModel {
  title: string;
  year: number;
  rated: string;
  released: Date;
  runtime: string;
  genre: [string];
  director: string;
  writer: [string];
  actors: [string];
  plot: string;
  language: string;
  country: string;
  awards: [string];
  poster: string;
  ratings: [object];
  type: string;
  dvd: Date;
  boxOffice: string;
  production: string;
  website: string;
  comments: any[];

  constructor(title: string, year: number, rated: string, released: Date, runtime: string,
              genre: [string], director: string, writer: [string], actors: [string],
              plot: string, language: string, country: string, awards: [string], poster: string,
              ratings: [object], type: string, dvd: Date, boxOffice: string, production: string, website: string, comments: any[]) {
    this.title = title;
    this.year = year;
    this.rated = rated;
    this.released = released;
    this.runtime = runtime;
    this.genre = genre;
    this.director = director;
    this.writer = writer;
    this.actors = actors;
    this.plot = plot;
    this.language = language;
    this.country = country;
    this.awards = awards;
    this.poster = poster;
    this.ratings = ratings;
    this.type = type;
    this.dvd = dvd;
    this.boxOffice = boxOffice;
    this.production = production;
    this.website = website;
    this.comments = comments;
  }
}
