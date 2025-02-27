import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  characters: any[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) { }

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe(data => {
      this.characters = data.results;
    });
  }
}