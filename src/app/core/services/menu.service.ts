import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plato {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Asegúrate de que esta URL coincida con tu controlador de Java
  private apiUrl = 'http://localhost:8080/api/platos'; 

  constructor(private http: HttpClient) {}

  // DEFINIR EL MÉTODO AQUÍ
  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }
}