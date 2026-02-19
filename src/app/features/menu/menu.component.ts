import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService, Plato } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';
import { TranslationService } from '../../core/services/translation.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink, ScrollAnimateDirective],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  platos: any[] = [];
  platosFiltrados: any[] = [];
  categorias: string[] = ['Todos', 'Entrantes', 'Principales', 'Para Compartir', 'Postres'];
  categoriaActiva = 'Todos';

  private categoriaKeyMap: Record<string, string> = {
    'Todos': 'menu.all',
    'Entrantes': 'menu.starters',
    'Principales': 'menu.mains',
    'Para Compartir': 'menu.sharing',
    'Postres': 'menu.desserts',
  };

  private platosLocales: any[] = [
    // --- ENTRANTES (tostas y ensaladas) ---
    { nombre: 'Bruschetta Clásica', nombreEn: 'Classic Bruschetta', descripcion: 'Pan tostado con tomate fresco, albahaca y aceite de oliva virgen extra.', descripcionEn: 'Toasted bread with fresh tomato, basil, and extra virgin olive oil.', precio: 7.50, imagen: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Ensalada Caprese', nombreEn: 'Caprese Salad', descripcion: 'Mozzarella fresca di bufala, tomate corazón de buey y albahaca con reducción de balsámico.', descripcionEn: 'Fresh buffalo mozzarella, beefsteak tomato, and basil with balsamic reduction.', precio: 10.50, imagen: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Crostini di Fegatini', nombreEn: 'Tuscan Liver Crostini', descripcion: 'Tostas toscanas con paté de hígado de pollo, alcaparras y cebolla caramelizada.', descripcionEn: 'Tuscan toasts with chicken liver pâté, capers, and caramelized onion.', precio: 9.50, imagen: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Panzanella Toscana', nombreEn: 'Tuscan Panzanella', descripcion: 'Ensalada toscana de pan crujiente, tomate, pepino, cebolla roja y albahaca fresca.', descripcionEn: 'Tuscan bread salad with tomato, cucumber, red onion, and fresh basil.', precio: 9.90, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Insalata di Rucola e Parmigiano', nombreEn: 'Arugula and Parmesan Salad', descripcion: 'Rúcula fresca con lascas de parmesano reggiano, tomates cherry y vinagreta de limón.', descripcionEn: 'Fresh arugula with Parmigiano Reggiano shavings, cherry tomatoes, and lemon vinaigrette.', precio: 8.90, imagen: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },

    // --- PRINCIPALES ---
    { nombre: 'Spaghetti Carbonara', nombreEn: 'Spaghetti Carbonara', descripcion: 'Spaghetti al dente con guanciale crujiente, yema de huevo, pecorino romano y pimienta negra.', descripcionEn: 'Al dente spaghetti with crispy guanciale, egg yolk, pecorino romano, and black pepper.', precio: 14.50, imagen: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Risotto ai Funghi Porcini', nombreEn: 'Porcini Mushroom Risotto', descripcion: 'Arroz carnaroli cremoso con boletus, mantequilla y parmesano reggiano 24 meses.', descripcionEn: 'Creamy carnaroli rice with porcini mushrooms, butter, and 24-month aged Parmigiano Reggiano.', precio: 16.90, imagen: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Lasagna della Nonna', nombreEn: 'Grandma\'s Lasagna', descripcion: 'Lasaña tradicional con ragú boloñés casero, bechamel y parmesano gratinado.', descripcionEn: 'Traditional lasagna with homemade Bolognese ragu, bechamel, and gratinated Parmesan.', precio: 15.50, imagen: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Ossobuco alla Milanese', nombreEn: 'Ossobuco Milanese Style', descripcion: 'Jarrete de ternera braseado lentamente con gremolata y risotto azafranado.', descripcionEn: 'Slowly braised veal shank with gremolata and saffron risotto.', precio: 22.90, imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Saltimbocca alla Romana', nombreEn: 'Saltimbocca alla Romana', descripcion: 'Escalope de ternera con jamón de Parma, salvia y salsa de vino blanco.', descripcionEn: 'Veal escalope with Parma ham, sage, and white wine sauce.', precio: 19.50, imagen: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },

    // --- PARA COMPARTIR (pizzas) ---
    { nombre: 'Pizza Margherita', nombreEn: 'Margherita Pizza', descripcion: 'La clásica napolitana con salsa de tomate San Marzano, mozzarella fior di latte y albahaca.', descripcionEn: 'The classic Neapolitan with San Marzano tomato sauce, fior di latte mozzarella, and basil.', precio: 12.90, imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Pizza Quattro Formaggi', nombreEn: 'Four Cheese Pizza', descripcion: 'Mozzarella, gorgonzola, fontina y parmesano sobre base de tomate con un toque de nuez moscada.', descripcionEn: 'Mozzarella, gorgonzola, fontina, and Parmesan on a tomato base with a touch of nutmeg.', precio: 14.50, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Pizza Diavola', nombreEn: 'Diavola Pizza', descripcion: 'Salsa de tomate, mozzarella, salami picante calabrés y aceite de guindilla.', descripcionEn: 'Tomato sauce, mozzarella, spicy Calabrian salami, and chili oil.', precio: 13.90, imagen: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Pizza Prosciutto e Funghi', nombreEn: 'Prosciutto & Mushroom Pizza', descripcion: 'Jamón cocido italiano, champiñones frescos, mozzarella y un toque de orégano.', descripcionEn: 'Italian cooked ham, fresh mushrooms, mozzarella, and a touch of oregano.', precio: 14.90, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Pizza Capricciosa', nombreEn: 'Capricciosa Pizza', descripcion: 'Alcachofas, jamón cocido, champiñones, aceitunas negras y mozzarella sobre salsa de tomate.', descripcionEn: 'Artichokes, cooked ham, mushrooms, black olives, and mozzarella on tomato sauce.', precio: 15.50, imagen: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },

    // --- POSTRES ---
    { nombre: 'Tiramisú Clásico', nombreEn: 'Classic Tiramisu', descripcion: 'Nuestro tiramisú casero con mascarpone, café expreso y cacao amargo.', descripcionEn: 'Our homemade tiramisu with mascarpone, espresso coffee, and dark cocoa.', precio: 8.50, imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Panna Cotta ai Frutti di Bosco', nombreEn: 'Panna Cotta with Mixed Berries', descripcion: 'Panna cotta de vainilla con coulis de frutos rojos y menta fresca.', descripcionEn: 'Vanilla panna cotta with mixed berry coulis and fresh mint.', precio: 7.90, imagen: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Cannoli Siciliani', nombreEn: 'Sicilian Cannoli', descripcion: 'Tubos crujientes rellenos de crema de ricotta con pistachos y chocolate.', descripcionEn: 'Crispy tubes filled with ricotta cream, pistachios, and chocolate.', precio: 7.50, imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Gelato Artesanal', nombreEn: 'Artisan Gelato', descripcion: 'Tres bolas de helado artesano a elegir: pistacho, stracciatella o avellana.', descripcionEn: 'Three scoops of artisan gelato of your choice: pistachio, stracciatella, or hazelnut.', precio: 6.90, imagen: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Affogato al Caffè', nombreEn: 'Affogato al Caffe', descripcion: 'Helado de vainilla bañado en espresso caliente con un toque de amaretto.', descripcionEn: 'Vanilla gelato drowned in hot espresso with a touch of amaretto.', precio: 6.90, imagen: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
  ];

  constructor(
    private menuService: MenuService,
    public cartService: CartService,
    public ts: TranslationService
  ) {}

  ngOnInit(): void {
    this.menuService.getPlatos().subscribe({
      next: (platos) => {
        const platosBackend = platos.map((p) => ({
          ...p,
          categoria: p.categoria || this.asignarCategoria(p.nombre),
        }));
        this.platos = [...platosBackend, ...this.platosLocales];
        this.platosFiltrados = this.platos;
      },
      error: () => {
        this.platos = this.platosLocales;
        this.platosFiltrados = this.platos;
      },
    });
  }

  getLang(): string {
    return this.ts.currentLang;
  }

  getCategorias(): string[] {
    return this.categorias;
  }

  getCategoriaDisplay(cat: string): string {
    const key = this.categoriaKeyMap[cat];
    return key ? this.ts.t(key) : cat;
  }

  getCategoriaKey(cat: string): string {
    return cat;
  }

  filtrarPor(categoria: string): void {
    this.categoriaActiva = categoria;
    this.platosFiltrados =
      categoria === 'Todos'
        ? this.platos
        : this.platos.filter((p) => p.categoria === categoria);
  }

  asignarCategoria(nombre: string): string {
    const n = nombre.toLowerCase();

    if (
      n.includes('ensalada') ||
      n.includes('bruschetta') ||
      n.includes('crostini') ||
      n.includes('antipasto') ||
      n.includes('insalata') ||
      n.includes('panzanella') ||
      n.includes('caprese')
    )
      return 'Entrantes';

    if (
      n.includes('tiramis') ||
      n.includes('postre') ||
      n.includes('tarta') ||
      n.includes('panna cotta') ||
      n.includes('helado') ||
      n.includes('cannoli') ||
      n.includes('gelato') ||
      n.includes('affogato')
    )
      return 'Postres';

    if (n.includes('pizza'))
      return 'Para Compartir';

    return 'Principales';
  }

  asignarImagen(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('pizza'))
      return 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('spaghetti') || nombreLower.includes('carbonara'))
      return 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('ensalada') || nombreLower.includes('insalata'))
      return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('tiramis') || nombreLower.includes('postre'))
      return 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('risotto') || nombreLower.includes('arroz'))
      return 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60';

    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60';
  }
}
