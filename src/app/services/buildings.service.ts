import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/buildings';
  private token? = localStorage.getItem('token') || '';

  getAllBuildings() {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.get<any>(`${this.baseUrl}/getAllBuildings`, {headers});
  }
}
