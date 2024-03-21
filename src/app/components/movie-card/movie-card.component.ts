import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() searchTerm: string = '';

  constructor(private localStorageService: LocalStorageService) { }

  
  toggleFavorite(): void {
    const favorites = this.localStorageService.getItem('favorites') || [];
    const index = favorites.indexOf(this.movie.imdbID);
    if (index === -1) {
      favorites.push(this.movie.imdbID);
    } else {
      favorites.splice(index, 1);
    }
    this.localStorageService.setItem('favorites', favorites);
  }

  isFavorite(): boolean {
    const favorites = this.localStorageService.getItem('favorites') || [];
    return favorites.includes(this.movie.imdbID);
  }
}
