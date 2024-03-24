import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Movie } from 'src/app/models/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: Movie | undefined;
  @Input() searchTerm: string = '';

  constructor(private localStorageService: LocalStorageService, private snackBar: MatSnackBar) { }

  
  toggleFavorite(): void {
    const favorites = this.localStorageService.getItem('favorites') || [];
    const index = favorites.indexOf(this.movie?.imdbID);
    if (index === -1) {
      favorites.push(this.movie?.imdbID);
      this.openSnackBar('Filme adicionado aos favoritos');
    } else {
      favorites.splice(index, 1);
      this.openSnackBar('Filme removido dos Favoritos');

    }
    this.localStorageService.setItem('favorites', favorites);

  }

  isFavorite(): boolean {
    const favorites = this.localStorageService.getItem('favorites') || [];
    return favorites.includes(this.movie?.imdbID);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 1000, 
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-toast']
    });
  }

}
