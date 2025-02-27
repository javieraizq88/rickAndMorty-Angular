import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getEpisodeByUrl(url: string): Observable<Episode> {
    return this.http.get<Episode>(url);
  }
}