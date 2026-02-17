import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-screen" [class.hidden]="!visible">
      <div class="loader-content">
        <h1 class="loader-title">La Tavola</h1>
        <div class="loader-line"></div>
      </div>
    </div>
  `,
  styles: [`
    .loader-screen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background-color: var(--charcoal, #2a2a2a);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 1;
    }
    .loader-screen.hidden {
      opacity: 0;
      pointer-events: none;
    }
    .loader-content {
      text-align: center;
    }
    .loader-title {
      font-family: var(--font-heading, 'Cormorant Garamond', serif);
      font-size: 3rem;
      font-weight: 300;
      font-style: italic;
      color: var(--cream, #f5f0e8);
      letter-spacing: 0.1em;
      margin-bottom: 1.5rem;
    }
    .loader-line {
      height: 2px;
      background: var(--orange, #d4762c);
      margin: 0 auto;
      animation: expandLine 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    @keyframes expandLine {
      from { width: 0; }
      to { width: 200px; }
    }
  `]
})
export class LoaderComponent implements OnInit {
  visible = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = false;
    }, 2000);
  }
}
