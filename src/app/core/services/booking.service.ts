import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Asegúrate de que coincida con tu @RequestMapping en Java
  private apiUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) { }

  crearReserva(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}