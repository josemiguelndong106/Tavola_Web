import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, Plato } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'], //
})

export class MenuComponent implements OnInit {
  
  platos$: Observable<Plato[]> | undefined;

  constructor(private menuService: MenuService, public cartService: CartService) {}

  ngOnInit(): void {
    
    console.log("Iniciando carga de platos...");
    this.platos$ = this.menuService.getPlatos();
  }



  
  asignarImagen(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('pizza')) return 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('spaghetti') || nombreLower.includes('Spaghetti Carbonara')) return 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('ensalada')) return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('tiramis') || nombreLower.includes('postre')) return 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('risotto') || nombreLower.includes('arroz')) return 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60';
    
    
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60';
  }
}