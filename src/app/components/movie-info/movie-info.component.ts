import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../../shared/services/omdb.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { MovieDetails } from 'src/app/shared/models/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  id: any;
  data: MovieDetails | undefined;
  isFavorite: boolean = false;

  constructor(private route: ActivatedRoute, private omdbService: OmdbService, private localStorageService: LocalStorageService, private snackBar: MatSnackBar) { }

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
      this.openSnackBar(`${this.data?.Title} foi adicionado aos favoritos`);
    } else {
      favorites.splice(index, 1);
      this.openSnackBar(`${this.data?.Title} foi removido dos favoritos`);
    }
    this.localStorageService.setItem('favorites', favorites);
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
