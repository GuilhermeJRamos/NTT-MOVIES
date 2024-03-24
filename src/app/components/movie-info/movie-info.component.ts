import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../../services/omdb.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MovieDetails } from 'src/app/models/interfaces';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  id: any;
  data: MovieDetails | undefined;
  isFavorite: boolean = false;

  constructor(private route: ActivatedRoute, private omdbService: OmdbService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['imdbID'];
    this.getOneMovie();
    this.checkFavoriteStatus();
  }

  getOneMovie() {
    this.omdbService.getDataDetails(this.id).subscribe((data) => {
      this.data = data;
      console.log(data);
    })
  }

  checkFavoriteStatus(): void {
    this.isFavorite = this.localStorageService.getItem('favorites')?.includes(this.id) || false;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    const favorites = this.localStorageService.getItem('favorites') || [];
    const index = favorites.indexOf(this.id);
    if (index === -1) {
      favorites.push(this.id);
    } else {
      favorites.splice(index, 1);
    }
    this.localStorageService.setItem('favorites', favorites);
  }
}
