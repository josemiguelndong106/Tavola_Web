import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { FormsModule } from '@angular/forms'; // <--- IMPORTANTE: Añade esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, FormsModule], // <--- AÑADE FormsModule AQUÍ
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'La_Tavola';
  chatAbierto = false;

  // Los mensajes y variables deben estar DENTRO de la clase
  mensajes = [{ emisor: 'bot', texto: '¡Bienvenido a La Tavola! ¿En qué puedo ayudarte?' }];
  nuevoMensaje = '';

  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      this.mensajes.push({ emisor: 'usuario', texto: this.nuevoMensaje });
      const consulta = this.nuevoMensaje.toLowerCase();
      this.nuevoMensaje = '';

      setTimeout(() => {
        if (consulta.includes('horario')) {
          this.mensajes.push({ emisor: 'bot', texto: 'Abrimos de Martes a Domingo, de 13:00 a 16:00 y de 20:00 a 23:30. 🍷' });
        } else if (consulta.includes('recomienda') || consulta.includes('plato')) {
          this.mensajes.push({ emisor: 'bot', texto: 'Nuestra especialidad hoy es el Risotto de Setas. ¡Está espectacular! 🍄' });
        } else {
          this.mensajes.push({ emisor: 'bot', texto: 'Entiendo. Si quieres reservar, pulsa en la sección de Reservas del menú superior.' });
        }
      }, 1000);
    }
  }
}