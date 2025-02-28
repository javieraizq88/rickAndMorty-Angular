import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character';
import { Location } from '../../interfaces/location';
import { Episode } from '../../interfaces/episode';
import { LocationService } from '../../services/location.service';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-character-details',
  standalone: false,
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit {
  @Input() character: Character | null = null;
  origin: Location | null = null;
  originResident: Character | null = null;
  location: Location | null = null;
  locationResident: Character | null = null;
  episode: Episode | null = null;

  constructor(
    private locationService: LocationService,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    if (this.character) {
    // console.log('Character Details:', this.character); 
      this.getOrigin();
      this.getLocation();
      this.getEpisode();
    }
  }
  
  getOrigin(): void {
    if (this.character?.origin.url) {
      this.locationService.getLocationByUrl(this.character.origin.url).subscribe(location => {
        this.origin = location;
        if (location.residents && location.residents.length > 0) {
          this.locationService.getCharacterByUrl(location.residents[0]).subscribe(resident => {
            this.originResident = resident;
          });
        }
      });
    }
  }

  getLocation(): void {
    if (this.character?.location.url) {
      this.locationService.getLocationByUrl(this.character.location.url).subscribe(location => {
        this.location = location;
        if (location.residents && location.residents.length > 0) {
          this.locationService.getCharacterByUrl(location.residents[0]).subscribe(resident => {
            this.locationResident = resident;
          });
        }
      });
    }
  }

  getEpisode(): void {
    if (this.character?.episode && this.character.episode.length > 0) {
      this.episodeService.getEpisodeByUrl(this.character.episode[0]).subscribe(episode => {
        this.episode = episode;
      });
    }
  }
}