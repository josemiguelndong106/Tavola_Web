import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { TranslationService } from '../../core/services/translation.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuOpen = false;
  scrolled = false;
  lang: 'es' | 'en' = 'es';

  constructor(
    public cartService: CartService,
    public ts: TranslationService
  ) {
    this.ts.lang$.subscribe((l) => (this.lang = l));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLang() {
    this.ts.toggleLang();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 80;
  }
}
