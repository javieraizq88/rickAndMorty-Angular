import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../../services/rick-and-morty.service';

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) { }

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe(data => {
      this.characters = data.results;
    });
  }
}