import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

export interface ChatMessage {
  texto: string;
  emisor: 'usuario' | 'bot';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(mensaje: string): Observable<string> {
    return this.http.post<{ respuesta: string }>(this.apiUrl, { mensaje }).pipe(
      timeout(30000),
      map(res => res.respuesta),
      catchError(() => of('No se pudo conectar con el servidor. Inténtalo de nuevo.'))
    );
  }
}
