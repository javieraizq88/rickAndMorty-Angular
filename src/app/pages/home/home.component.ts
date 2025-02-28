import { Component, ViewChild } from '@angular/core';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  @ViewChild(CharacterListComponent) characterList!: CharacterListComponent;
  nameFilter: string = '';
  speciesFilter: string = '';
  genderFilter: string = '';
  statusFilter: string[] = [];
  favoriteCharacters: Character[] = [];

  onSearchChanged(filters: any): void {
    this.nameFilter = filters.name;
    this.speciesFilter = filters.species;
    this.genderFilter = filters.gender;
    this.statusFilter = filters.status;
  }

  onFavoriteToggled(character: Character): void {
    const index = this.favoriteCharacters.findIndex(c => c.id === character.id);
    if (index === -1) {
      this.favoriteCharacters.push(character);
      character.isFavorite = true;
      console.log('Personaje agregado a favoritos:', character.name); 
    } else {
      this.favoriteCharacters.splice(index, 1);
      character.isFavorite = false;
      console.log('Personaje eliminado de favoritos:', character.name); 
    }
  }
}