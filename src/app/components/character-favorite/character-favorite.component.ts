import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../interfaces/character';
import { faChevronDown, faChevronUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDetailsComponent } from '../character-details/character-details.component';

@Component({
  selector: 'app-character-favorite',
  standalone: false,
  templateUrl: './character-favorite.component.html',
  styleUrl: './character-favorite.component.css'
})

export class CharacterFavoriteComponent {
  @Input() favoriteCharacters: Character[] = [];
  @Output() favoriteToggled = new EventEmitter<Character>();
  isCollapsed = true; // estado inicial del collapse
  // iconos
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faStar = faStar;

  constructor(public dialog: MatDialog) {}

  onFavoriteToggled(character: Character): void {
    const index = this.favoriteCharacters.findIndex(c => c.id === character.id);
    if (index === -1) {
      this.favoriteCharacters.push(character);
      character.isFavorite = true;
      // console.log('Personaje agregado a favoritos:', character.name);
    } else {
      this.favoriteCharacters.splice(index, 1);
      character.isFavorite = false;
      // console.log('Personaje eliminado de favoritos:', character.name);
    }
    this.favoriteToggled.emit(character);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openDialog(character: Character): void {
    this.dialog.open(CharacterDetailsComponent, {
      width: '600px',
      data: { character: character }, // Pasa el personaje al modal
    });
  }
  
}
