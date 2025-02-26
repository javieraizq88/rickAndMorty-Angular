import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
