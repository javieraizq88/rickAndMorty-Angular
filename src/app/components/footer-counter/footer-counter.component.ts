import { Component, Input, OnChanges } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-footer-counter',
  standalone: false,
  templateUrl: './footer-counter.component.html',
  styleUrl: './footer-counter.component.css'
})
export class FooterCounterComponent implements OnChanges {
  @Input() characters: Character[] = [];
  @Input() humanCount: number = 0;
  speciesCounts: { [key: string]: number } = {};
  typeCounts: { [key: string]: number } = {};
  speciesKeys: string[] = [];
  typeKeys: string[] = [];

  ngOnChanges(): void {
    this.updateCounts();
  }
  
  updateCounts(): void {
    this.speciesCounts = {};
    this.typeCounts = {};

    this.characters.forEach(character => {
      if (character.species) {
        this.speciesCounts[character.species] = (this.speciesCounts[character.species] || 0) + 1;
      }
      if (character.type) {
        this.typeCounts[character.type] = (this.typeCounts[character.type] || 0) + 1;
      }
    });

    this.speciesKeys = Object.keys(this.speciesCounts);
    this.typeKeys = Object.keys(this.typeCounts);
    console.log('Species Counts:', this.speciesCounts);
    console.log('Type Counts:', this.typeCounts);
  }
}