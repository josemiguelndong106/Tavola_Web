import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService, ReservaDTO } from '../../core/services/reserva.service';
import { CartService } from '../../core/services/cart.service';
import { Plato } from '../../core/services/menu.service';
import { TranslationService } from '../../core/services/translation.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  itemsCarrito: Plato[] = [];
  totalCarrito: number = 0;

  reserva = {
    clienteNombre: '',
    email: '',
    fecha: '',
    hora: '',
    mesaId: null as number | null,
    comensales: '',
    preferenciaMesa: '',
    observaciones: ''
  };

  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';
  reservaConfirmada = false;


  constructor(
    private reservaService: ReservaService,
    public cartService: CartService,
    public ts: TranslationService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.itemsCarrito = items;
      this.totalCarrito = this.cartService.calcularTotal();
    });
  }

confirmarReserva(): void {
  if (!this.reserva.clienteNombre || !this.reserva.email || this.reserva.mesaId === null) {
    this.mostrarMensaje(this.ts.t('res.error_fields'), 'error');
    return;
  }

  const platosParaEnviar = this.itemsCarrito.map(item => ({
    nombre: item.nombre,
    precio: item.precio
  }));

  const reservaDTO: any = {
    clienteNombre: this.reserva.clienteNombre,
    email: this.reserva.email,
    fecha: this.reserva.fecha,
    hora: this.reserva.hora + ':00',
    mesaId: this.reserva.mesaId,
    platos: platosParaEnviar,
    total: this.totalCarrito
  };

  this.reservaService.crearReserva(reservaDTO).subscribe({
    next: () => {
      this.reservaConfirmada = true;
      this.mostrarMensaje(this.ts.t('res.success'), 'success');
      setTimeout(() => { this.reservaConfirmada = false; }, 3000);
      this.limpiarFormulario();
      this.cartService.limpiarCarrito();
    },
    error: (error: any) => {
      this.mostrarMensaje(this.ts.t('res.error_process'), 'error');
    }
  });
}

  mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;

    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 5000);
  }

  limpiarFormulario(): void {
    this.reserva = {
      clienteNombre: '',
      email: '',
      fecha: '',
      hora: '',
      mesaId: null,
      comensales: '',
      preferenciaMesa: '',
      observaciones: ''
    };
  }
}
