import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../interfaces/character';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms'; 
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
  
  @Input() nameFilter: string = '';
  @Input() speciesFilter: string = '';
  @Input() genderFilter: string = '';
  @Input() statusFilter: string[] = [];

  noResults = false; // cuando no hay resultados de busqueda
  activeFilters: string[] = [];

  constructor( private characterService: CharacterService ) { }
  
  ngOnInit(): void {
    this.getCharacters(); // Carga los personajes iniciales
  }
  ngOnChanges(): void {
    this.getCharacters();
  }

  getCharacters(): void {
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
}