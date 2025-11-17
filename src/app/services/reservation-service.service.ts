import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:8000/reservation';
  private token? = localStorage.getItem('token') || '';
  // getReserves/<uuid:id>/

  getSchedules(id:any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.get<any>(`${this.baseUrl}/getSchedules/${id}`, {headers});
  }
  constructor() { }
}
