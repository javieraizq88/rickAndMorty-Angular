import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(name?: string, species?: string, gender?: string, status?: string[]): Observable<any> {
    let params = new HttpParams(); //  Construye los parámetros de la URL

    if (name !== undefined && name !== null && name !== '') { // Verifica si name es undefined, null o vacío antes de agregarlo a la URL
      params = params.set('name', name);
    }
    if (species) {
      params = params.set('species', species);
    }
    if (gender) {
      params = params.set('gender', gender);
    }
    if (status && status.length > 0) {
      params = params.set('status', status.join(',')); // Une los Statuss con comas
    }

    return this.http.get<any>(this.apiUrl, { params });
  }
}