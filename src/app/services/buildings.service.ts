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

  createBuilding(payload: any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.post<any>(`${this.baseUrl}/createBuilding`, payload, {headers});
  }

  updateBuilding(id: string, payload: any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.put<any>(`${this.baseUrl}/updateBuilding/${id}`, payload, {headers});
  }

  deleteBuilding(id: string) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.delete<any>(`${this.baseUrl}/deleteBuilding/${id}`, {headers});
  }
}
