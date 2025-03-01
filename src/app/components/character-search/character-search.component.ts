import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-character-search',
  standalone: false,
  templateUrl: './character-search.component.html',
  styleUrl: './character-search.component.css'
})
export class CharacterSearchComponent implements OnInit {
  nameFilter = new FormControl(''); // Campo de búsqueda por Name
  speciesFilter = new FormControl(''); // Campo de búsqueda por Species
  genderFilter = new FormControl(''); // Campo de búsqueda por Gender
  statusForm: FormGroup; // Campo de búsqueda por Status
  statusFormControl: FormControl = new FormControl([]);

  @Output() searchChanged = new EventEmitter<{
    name: string,
    species: string,
    gender: string,
    status: string[]
  }>();

  constructor(private fb: FormBuilder) {
    this.statusForm = this.fb.group({
      status: this.statusFormControl
    });
  }

  ngOnInit(): void {
    this.setupFilterListeners(); // Configura los listeners de los filtros
  }

  setupFilterListeners(): void {
    this.nameFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged()) // Escucha los cambios en el filtro de Name
      .subscribe(() => this.emitSearchChange());

    this.speciesFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged()) // Escucha los cambios en el filtro de Speciess
      .subscribe(() => this.emitSearchChange());

    this.genderFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged()) // Escucha los cambios en el filtro de genero
      .subscribe(() => this.emitSearchChange());

    this.statusFormControl.valueChanges // Usa statusFormControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.emitSearchChange());
  }

  emitSearchChange(): void {
    this.searchChanged.emit({
      name: this.nameFilter.value!,
      species: this.speciesFilter.value!,
      gender: this.genderFilter.value!,
      status: this.statusFormControl.value
    });
  }
}