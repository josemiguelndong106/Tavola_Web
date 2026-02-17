import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Objeto para capturar los datos del formulario
  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  // Método que se ejecutará al pulsar el botón
  onLogin(): void {
    console.log('Intentando iniciar sesión con:', this.credentials);
    
    // Por ahora, como solo estamos en la parte visual, 
    // simularemos un acceso exitoso para que veas cómo funciona.
    if (this.credentials.email && this.credentials.password) {
      alert('Login visual exitoso (Simulación)');
      // Aquí es donde más adelante redirigiremos al panel de empleado o encargado
      // this.router.navigate(['/dashboard']); 
    } else {
      alert('Por favor, rellena todos los campos');
    }
  }
}