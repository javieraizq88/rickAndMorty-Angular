import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../interfaces/character';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { catchError, of } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de lupa

@Component({
  selector: 'app-character-list',
  standalone: false,
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})

export class CharacterListComponent implements OnInit {
  faSearch = faSearch; 
  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created', 'actions']; // Agrega 'actions'
  dataSource = new MatTableDataSource<Character>();
  selectedCharacter: Character | null = null;
  @ViewChild(MatSort) sort!: MatSort;
  
  @Input() nameFilter: string = '';
  @Input() speciesFilter: string = '';
  @Input() genderFilter: string = '';
  @Input() statusFilter: string[] = [];

  noResults = false; // cuando no hay resultados de busqueda
  activeFilters: string[] = [];
  loading = false;

  constructor( private characterService: CharacterService ) { }
  
  ngOnInit(): void {
    this.getCharacters(); // Carga los personajes iniciales
  }
  ngOnChanges(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.loading = true; 
    this.activeFilters = [];
    if (this.nameFilter) this.activeFilters.push('name');
    if (this.speciesFilter) this.activeFilters.push('species');
    if (this.genderFilter) this.activeFilters.push('gender');
    if (this.statusFilter && this.statusFilter.length > 0) this.activeFilters.push('status');

    this.characterService
    .getCharacters(this.nameFilter, this.speciesFilter, this.genderFilter, this.statusFilter)
    .pipe(
      catchError(() => {
        this.noResults = true;
        this.dataSource.data = [];
        this.loading = false; // loading en false en caso de error
        return of({ results: [] });
      })
    )
    .subscribe((data) => {
      if (data && data.results) {
        this.dataSource.data = data.results;
        this.dataSource.sort = this.sort;
        this.noResults = data.results.length === 0;
      }
      this.loading = false; // Establece loading en false después de recibir los resultados
    });
  }

  selectCharacter(character: Character): void { 
    this.selectedCharacter = character;
  }
}