import { Injectable } from '@angular/core';
import { Plato } from './menu.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Plato[] = [];
  private _cart = new BehaviorSubject<Plato[]>([]);
  cart$ = this._cart.asObservable();

  agregarAlCarrito(plato: Plato) {
    this.items.push(plato);
    this._cart.next([...this.items]);
  }

  obtenerItems() {
    return this.items;
  }

  limpiarCarrito() {
    this.items = [];
    this._cart.next([]);
    return this.items;
  }

  calcularTotal() {
    return this.items.reduce((acc, item) => acc + item.precio, 0);
  }
}