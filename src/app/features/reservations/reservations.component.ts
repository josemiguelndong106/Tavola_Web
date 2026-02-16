import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService, ReservaDTO } from '../../core/services/reserva.service';
import { CartService } from '../../core/services/cart.service';
import { Plato } from '../../core/services/menu.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    mesaId: null as number | null
  };

  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';


  constructor(
    private reservaService: ReservaService, 
    public cartService: CartService 
  ) {}

  ngOnInit() {

    this.cartService.cart$.subscribe(items => {
      this.itemsCarrito = items;
      this.totalCarrito = this.cartService.calcularTotal();
    });
  }

confirmarReserva(): void {
  if (!this.reserva.clienteNombre || !this.reserva.email || this.reserva.mesaId === null) {
    this.mostrarMensaje('Por favor completa todos los campos', 'error');
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
      this.mostrarMensaje('¡Reserva confirmada con éxito!', 'success');
      this.limpiarFormulario();
      this.cartService.limpiarCarrito(); 
    },
    error: (error: any) => {
      this.mostrarMensaje('Error al procesar la reserva', 'error');
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
      mesaId: null
    };
  }
}