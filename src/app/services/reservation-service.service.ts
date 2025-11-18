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

  getReservedSchedules(id: string, date: string) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.get<any>(`${this.baseUrl}/getReservedSchedules/${id}/reserved_schedules/?date=${date}`, {headers});
  }

  getUserReservations(user_id: string) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.get<any>(`${this.baseUrl}/minhasReservas/${user_id}`, {headers});
  }

  getUserReservationsFromEnviorement(user_id: any, fk_enviorement: any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.get<any>(`${this.baseUrl}/getUserReservesFromEnviorement/${user_id}/${fk_enviorement}`, {headers});
  }

  cancelReserve(id:string) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    return this.http.put<any>(`${this.baseUrl}/cancelarReserva/${id}`, {headers});
  }
  createReservation(payload: any) {
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    console.log(payload)
    return this.http.post<any>(`${this.baseUrl}/reserve/create/`, payload, {headers});
  }
}
