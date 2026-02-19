import { Component, HostListener, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { TranslationService } from './core/services/translation.service';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ChatService, ChatMessage } from './core/services/chat.service';

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
export class App implements AfterViewChecked {
  title = 'La_Tavola';
  chatAbierto = false;
  showScrollTop = false;
  isTyping = false;

  mensajes: ChatMessage[] = [];
  nuevoMensaje = '';

  @ViewChild('chatBody') private chatBody!: ElementRef;
  private shouldScroll = false;

  constructor(
    public ts: TranslationService,
    private chatService: ChatService
  ) {
    this.addBotMessage(this.ts.t('chat.welcome'));
    this.ts.lang$.subscribe(() => {
      if (this.mensajes.length === 1 && this.mensajes[0].emisor === 'bot') {
        this.mensajes = [];
        this.addBotMessage(this.ts.t('chat.welcome'));
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollChatToBottom();
      this.shouldScroll = false;
    }
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
    if (this.chatAbierto) {
      this.shouldScroll = true;
    }
  }

  enviarMensaje() {
    const texto = this.nuevoMensaje.trim();
    if (!texto || this.isTyping) return;

    this.mensajes.push({ emisor: 'usuario', texto, timestamp: new Date() });
    this.nuevoMensaje = '';
    this.isTyping = true;
    this.shouldScroll = true;

    this.chatService.sendMessage(texto).subscribe({
      next: (respuesta) => {
        this.isTyping = false;
        this.addBotMessage(respuesta);
      },
      error: () => {
        this.isTyping = false;
        this.addBotMessage('No se pudo conectar con el servidor. Inténtalo de nuevo.');
      }
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  private addBotMessage(texto: string): void {
    this.mensajes.push({ emisor: 'bot', texto, timestamp: new Date() });
    this.shouldScroll = true;
  }

  private scrollChatToBottom(): void {
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }
}
