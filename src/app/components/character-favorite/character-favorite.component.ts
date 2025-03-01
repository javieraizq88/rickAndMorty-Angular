import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../interfaces/character';
import { faChevronDown, faChevronUp, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-character-favorite',
  standalone: false,
  templateUrl: './character-favorite.component.html',
  styleUrl: './character-favorite.component.css'
})

export class CharacterFavoriteComponent {
  @Input() favoriteCharacters: Character[] = [];
  @Output() favoriteToggled = new EventEmitter<Character>();
  @Output() characterSelected = new EventEmitter<Character>(); // Emite el personaje seleccionado
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  isCollapsed = true; // estado inicial del collapse
  faStar = faStar; // icono estrella

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

  selectCharacter(character: Character): void {
    this.characterSelected.emit(character); // Emite el evento cuando se hace clic
  }

}
