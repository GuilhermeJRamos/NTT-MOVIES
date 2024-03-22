import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { LocalStorageService } from '../../services/local-storage.service';

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

  constructor(private user: OmdbService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  getValue() {
    if (this.binding !== undefined) {
      this.searchTerm = this.binding; 
      this.user.getData(this.binding).subscribe((data) => {
        this.users = data;
        console.log(this.users);
        this.showFavoritesButton = true; 
        setTimeout(() => {
          this.scrollDownToResults();
        }, 500); 
      });
    }
  }

  toggleFavorites(): void {
    if (this.showOnlyFavorites) {
        this.showOnlyFavorites = false;
        this.showFavoritesButton = true;
        this.searchTerm = '';
        this.getData();
    } else {
        this.showOnlyFavorites = true;
        const favorites = this.localStorageService.getItem('favorites') || [];
        this.users = { Search: this.users.Search.filter((item: any) => favorites.includes(item.imdbID)) };
        this.showFavoritesButton = true;
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
