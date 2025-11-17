import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviorementsService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/auth';

}
