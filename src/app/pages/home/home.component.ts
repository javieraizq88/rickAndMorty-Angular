import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  @ViewChild(CharacterListComponent) characterList!: CharacterListComponent;
  nameFilter: string = '';
  speciesFilter: string = '';
  genderFilter: string = '';
  statusFilter: string[] = [];
  favoriteCharacters: Character[] = []; // Guarda la lista de favoritos
  characters: Character[] = []; // Guarda la lista de personajes
  humanCount: number = 0; // Contador de humanos
  allCharacters: Character[] = []; // Guarda la lista completa de personajes

  constructor(private characterService: CharacterService) { } 

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe(data => {
      if (data && data.results) {
        this.allCharacters = data.results;
        this.updateCharacters();
      }
    });
  }

  onSearchChanged(filters: any): void {
    this.nameFilter = filters.name;
    this.speciesFilter = filters.species;
    this.genderFilter = filters.gender;
    this.statusFilter = filters.status;
    this.updateCharacters();
  }

  onFavoriteToggled(character: Character): void {
    const index = this.favoriteCharacters.findIndex(c => c.id === character.id);
    if (index === -1) {
      this.favoriteCharacters.push(character);
      character.isFavorite = true;
    //  console.log('Personaje agregado a favoritos:', character.name);
    } else {
      this.favoriteCharacters.splice(index, 1);
      character.isFavorite = false;
  //    console.log('Personaje eliminado de favoritos:', character.name);
    }
  }

  onCharacterSelected(character: Character): void {
    this.characterList.selectCharacter(character); // Actualiza selectedCharacter
  }

  onHumanCountChanged(count: number): void {
    this.humanCount = count;
  }

  updateCharacters(): void {
     if (!this.nameFilter && !this.speciesFilter && !this.genderFilter && (!this.statusFilter || this.statusFilter.length === 0)) {
      // No hay filtros aplicados, mostrar todos los personajes
      this.characters = this.allCharacters;
    } else {
      // Aplicar filtros
      this.characters = this.allCharacters.filter(character => {
        let matchesFilter = true;
        if (this.nameFilter && !character.name.toLowerCase().includes(this.nameFilter.toLowerCase())) matchesFilter = false;
        if (this.speciesFilter && !character.species.toLowerCase().includes(this.speciesFilter.toLowerCase())) matchesFilter = false;
        if (this.genderFilter && !character.gender.toLowerCase().includes(this.genderFilter.toLowerCase())) matchesFilter = false;
        if (this.statusFilter && this.statusFilter.length > 0 && !this.statusFilter.includes(character.status)) matchesFilter = false;
        return matchesFilter;
      });
    }
  }
}