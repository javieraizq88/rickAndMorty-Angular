import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../interfaces/character';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  statusFilter = new FormControl(''); // Campo de búsqueda por estado

  constructor ( private characterService: CharacterService ) {}

  ngOnInit(): void {
    this.getCharacters(); // Carga los personajes iniciales
    this.setupFilterListeners(); // Configura los listeners de los filtros
  }

  getCharacters(): void {
    const name = this.nameFilter.value || undefined; // verifica si this.nameFilter.value es null o undefined. Si es así, asigna undefined a name. De lo contrario, asigna el valor real
    const status = this.statusFilter.value || undefined; // verifica si this.statusFilter.value es null o undefined. Si es así, asigna undefined a name. De lo contrario, asigna el valor real

    this.characterService.getCharacters(name, status).subscribe((data) => {
      this.dataSource.data = data.results;
      this.dataSource.sort = this.sort;
    });
  }

  setupFilterListeners(): void {
    this.nameFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.getCharacters());

    this.statusFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.getCharacters());
  }
}