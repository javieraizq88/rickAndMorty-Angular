import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../interfaces/character';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { catchError, of } from 'rxjs';
import { faSearch, faStar, faStarHalfAlt, faStar as faRegularStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-character-list',
  standalone: false,
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})

export class CharacterListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created', 'actions'];
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

  // $$$ boton favorito 
  @Output() favoriteToggled = new EventEmitter<Character>();
  faSearch = faSearch;
  faStar = faStar;
  faRegularStar = faRegularStar;

  selectCharacter(character: Character): void {
    if (this.selectedCharacter) {
      this.selectedCharacter.isSelected = false;
    }
    this.selectedCharacter = character;
    character.isSelected = !character.isSelected;
  }

  toggleFavorite(character: Character): void {
    character.isFavorite = !character.isFavorite;
    this.favoriteToggled.emit(character);
  }
}