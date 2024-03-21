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

  constructor(private user: OmdbService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  getValue() {
    if (this.binding !== undefined) {
      this.searchTerm = this.binding; 
      this.user.getData(this.binding).subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });

    }
  }

  toggleFavorite(movieId: string): void {
    const favorites = this.localStorageService.getItem('favorites') || [];
    const index = favorites.indexOf(movieId);
    if (index === -1) {
      favorites.push(movieId);
    } else {
      favorites.splice(index, 1);
    }
    this.localStorageService.setItem('favorites', favorites);
  }

  isFavorite(movieId: string): boolean {
    const favorites = this.localStorageService.getItem('favorites') || [];
    return favorites.includes(movieId);
  }
}
