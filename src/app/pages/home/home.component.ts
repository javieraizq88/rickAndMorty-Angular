import { Component, ViewChild } from '@angular/core';
import { CharacterListComponent } from '../../components/character-list/character-list.component';

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

  onSearchChanged(filters: { name: string, species: string, gender: string, status: string[] }): void {
    this.nameFilter = filters.name;
    this.speciesFilter = filters.species;
    this.genderFilter = filters.gender;
    this.statusFilter = filters.status;
  }
}
