import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../interfaces/character';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, catchError, of } from 'rxjs';

@Component({
  selector: 'app-character-list',
  standalone: false,
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})

export class CharacterListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created'];
  dataSource = new MatTableDataSource<Character>();

  @ViewChild(MatSort) sort!: MatSort;

  nameFilter = new FormControl(''); // Campo de búsqueda por nombre
  speciesFilter = new FormControl(''); // Campo de búsqueda por especie
  genderFilter = new FormControl(''); // Campo de búsqueda por género
  noResults = false; // cuando no hay resultados de busqueda
  activeFilters: string[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacters(); // Carga los personajes iniciales
    this.setupFilterListeners(); // Configura los listeners de los filtros
  }

  getCharacters(): void {
    const name = this.nameFilter.value || undefined; // Obtiene el valor de nombre
    const species = this.speciesFilter.value || undefined; // Obtiene el valor de especie
    const gender = this.genderFilter.value || undefined; // Obtiene el valor de género

    this.activeFilters = []; // Restablece los filtros activos
    if (name) this.activeFilters.push('name');
    if (species) this.activeFilters.push('species');
    if (gender) this.activeFilters.push('gender');

    this.characterService
      .getCharacters(name, species, gender) // Pasa el valor de nombre, especie y genero al servicio
      .pipe(
        catchError(() => {
          this.noResults = true;
          this.dataSource.data = [];
          return of({ results: [] });
        })
      )
      .subscribe((data) => {
        if (data && data.results) {
          this.dataSource.data = data.results;
          this.dataSource.sort = this.sort;
          this.noResults = data.results.length === 0;
        }
      });
  }

  setupFilterListeners(): void {
    this.nameFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.getCharacters());

    this.speciesFilter.valueChanges // Escucha los cambios en el filtro de especie
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.getCharacters());
    this.genderFilter.valueChanges // Escucha los cambios en el filtro de género
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.getCharacters());
  }
}