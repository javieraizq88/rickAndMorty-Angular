import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CharactersComponent } from './components/characters/characters.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FavoritesComponent,
    CharactersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FavoritesComponent
  ]
})
export class SharedModule { }
