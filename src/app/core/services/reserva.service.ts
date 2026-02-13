import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Aquí definimos qué forma tienen los datos que enviamos a Java
export interface ReservaDTO {
  clienteNombre: string;
  email: string;
  fecha: string;
  hora: string;
  mesaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // Asegúrate de que este puerto (8080) es el de tu Java
  private apiUrl = 'http://localhost:8080/api/reservas'; 

  constructor(private http: HttpClient) {}

  crearReserva(reserva: ReservaDTO): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }
}