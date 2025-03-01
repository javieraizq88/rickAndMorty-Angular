import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list/character-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CharacterSearchComponent } from './character-search/character-search.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CharacterFavoriteComponent } from './character-favorite/character-favorite.component';
import { FooterCounterComponent } from './footer-counter/footer-counter.component';

@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterSearchComponent,
    CharacterDetailsComponent,
    CharacterFavoriteComponent,
    FooterCounterComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    FontAwesomeModule
  ],
  exports: [
    CharacterListComponent,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    CharacterSearchComponent,
    CharacterDetailsComponent,
    CharacterFavoriteComponent,
    FooterCounterComponent
  ]
})
export class SharedModule { }
