import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { TranslationService } from './core/services/translation.service';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { LoaderComponent } from './shared/components/loader/loader.component';

const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(12px)' }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('0.25s ease', style({ opacity: 0 })),
      ], { optional: true }),
      query(':enter', [
        animate('0.4s 0.15s ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ], { optional: true }),
    ]),
  ]),
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, FormsModule, TranslatePipe, LoaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  animations: [routeAnimation],
})
export class App {
  title = 'La_Tavola';
  chatAbierto = false;
  showScrollTop = false;

  mensajes: { emisor: string; texto: string }[] = [];
  nuevoMensaje = '';

  constructor(public ts: TranslationService) {
    this.mensajes = [{ emisor: 'bot', texto: this.ts.t('chat.welcome') }];
    this.ts.lang$.subscribe(() => {
      if (this.mensajes.length === 1 && this.mensajes[0].emisor === 'bot') {
        this.mensajes = [{ emisor: 'bot', texto: this.ts.t('chat.welcome') }];
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = window.scrollY > 500;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      this.mensajes.push({ emisor: 'usuario', texto: this.nuevoMensaje });
      const consulta = this.nuevoMensaje.toLowerCase();
      this.nuevoMensaje = '';

      setTimeout(() => {
        if (consulta.includes('horario') || consulta.includes('schedule') || consulta.includes('hours') || consulta.includes('open')) {
          this.mensajes.push({ emisor: 'bot', texto: this.ts.t('chat.schedule_response') });
        } else if (consulta.includes('recomienda') || consulta.includes('plato') || consulta.includes('recommend') || consulta.includes('dish') || consulta.includes('special')) {
          this.mensajes.push({ emisor: 'bot', texto: this.ts.t('chat.recommend_response') });
        } else {
          this.mensajes.push({ emisor: 'bot', texto: this.ts.t('chat.default_response') });
        }
      }, 1000);
    }
  }
}
