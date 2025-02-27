import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getLocationByUrl(url: string): Observable<Location> {
    return this.http.get<Location>(url);
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}