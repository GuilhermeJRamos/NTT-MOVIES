import { Component, OnInit, Renderer2 } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/local-storage.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any;
  binding!: string;
  searchTerm: string = '';
  showOnlyFavorites: boolean = false;
  showFavoritesButton: boolean = false;
  isScreenLarge: boolean = false;
  isScreenExtraLarge: boolean = false;

  constructor(
    private user: OmdbService,
    private localStorageService: LocalStorageService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.Large,
      Breakpoints.XLarge,
      '(min-width: 1441px)'
    ]).subscribe(result => {
      this.isScreenLarge = result.matches;
      this.isScreenExtraLarge = result.breakpoints['(min-width: 1441px)']; 
    });
  }

  ngOnInit(): void {
  }

  getValue() {
    if (this.binding !== undefined) {
      this.searchTerm = this.binding; 
      this.user.getData(this.binding).subscribe((data) => {
        this.users = data;
        console.log(this.users);
        if (this.users?.Search && this.users.Search.length > 0) {
          this.showFavoritesButton = true;
          setTimeout(() => {
            this.scrollDownToResults();
          }, 500);
          this.openSnackBar('Redirecionando aos filmes...');
        } else {
          this.showFavoritesButton = false;
          this.openSnackBar('Não existem filmes com o termo pesquisado');
        }
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 1500, 
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-toast']
    });
  }

  toggleFavorites(): void {
    if (this.showOnlyFavorites) {
      this.showOnlyFavorites = false;
      this.showFavoritesButton = true;
      this.searchTerm = '';
      this.getData();
      this.openSnackBar('Mostrando todos os filmes');
    } else {
      this.showOnlyFavorites = true;
      const favorites = this.localStorageService.getItem('favorites') || [];
      this.users = { Search: this.users.Search.filter((item: any) => favorites.includes(item.imdbID)) };
      this.showFavoritesButton = true;
      this.openSnackBar('Mostrando apenas os favoritos');
    }
  }

  getData() {
    this.user.getData(this.binding).subscribe((data) => {
      this.users = data;
      console.log(this.users);
      setTimeout(() => {
        this.scrollDownToResults();
      }, 500); 
    });
  }

  isFavorite(movieId: string): boolean {
    const favorites = this.localStorageService.getItem('favorites') || [];
    return favorites.includes(movieId);
  }

  scrollDownToResults() {
    const moviesContainer = document.querySelector('.movies-container');
    if (moviesContainer) {
      moviesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
