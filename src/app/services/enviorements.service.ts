import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviorementsService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/environments';
  private token? = localStorage.getItem('token') || '';

  getEnviorements() {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.get<any>(`${this.baseUrl}/getAllenvironments`, {headers});
  }

  createEnviorement(payload: any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.post<any>(`${this.baseUrl}/createenvironment`, payload, {headers});
  }

  updateEnviorement(id: string, payload: any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.put<any>(`${this.baseUrl}/updateenvironment/${id}`, payload, {headers});
  }

  deleteEnviorement(id: string) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.delete<any>(`${this.baseUrl}/deleteenvironment/${id}`, {headers});
  }

  getEnviorementById(id:any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.get<any>(`${this.baseUrl}/getEnviorement/${id}`, {headers});
  }
}
