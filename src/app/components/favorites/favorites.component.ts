import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addFavorite, removeFavorite } from '../../../states/states-favorites/favorite.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isFavorite$: Observable<boolean>;

  constructor(private store: Store<{ favorite: boolean }>) {
    this.isFavorite$ = this.store.pipe(select('favorite'));
  }

  ngOnInit(): void {
  }

  toggleFavorite(): void {
    this.isFavorite$.subscribe(isFavorite => {
      if (isFavorite) {
        this.store.dispatch(removeFavorite());
      } else {
        this.store.dispatch(addFavorite());
      }
    });
  }
}
