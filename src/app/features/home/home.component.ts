import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimateDirective, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('counterSection') counterSection!: ElementRef;

  testimonials = [
    { textKey: 'home.testimonial1_text', name: 'María García López', initials: 'MG', source: 'Google Reviews' },
    { textKey: 'home.testimonial2_text', name: 'Carlos Ruiz Martínez', initials: 'CR', source: 'TripAdvisor' },
    { textKey: 'home.testimonial3_text', name: 'Elena Fernández Díaz', initials: 'EF', source: 'El Tenedor' },
  ];

  counters = [
    { target: 40, suffix: '+', current: 0, labelKey: 'home.counter_years' },
    { target: 1, suffix: '', current: 0, labelKey: 'home.counter_michelin' },
    { target: 50, suffix: 'K+', current: 0, labelKey: 'home.counter_guests' },
    { target: 120, suffix: '+', current: 0, labelKey: 'home.counter_recipes' },
  ];

  private counterObserver?: IntersectionObserver;
  private countersAnimated = false;

  ngAfterViewInit(): void {
    if (this.counterSection) {
      this.counterObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.countersAnimated) {
            this.countersAnimated = true;
            this.animateCounters();
          }
        },
        { threshold: 0.3 }
      );
      this.counterObserver.observe(this.counterSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.counterObserver?.disconnect();
  }

  private animateCounters(): void {
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.counters.forEach((c) => {
        c.current = Math.round(c.target * eased);
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
