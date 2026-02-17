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
    // --- ENTRANTES ---
    { nombre: 'Bruschetta Clásica', nombreEn: 'Classic Bruschetta', descripcion: 'Pan tostado con tomate fresco, albahaca y aceite de oliva virgen extra.', descripcionEn: 'Toasted bread with fresh tomato, basil, and extra virgin olive oil.', precio: 7.50, imagen: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Carpaccio di Manzo', nombreEn: 'Beef Carpaccio', descripcion: 'Finas láminas de ternera cruda con rúcula, parmesano y vinagreta de limón.', descripcionEn: 'Thin slices of raw beef with arugula, Parmesan, and lemon vinaigrette.', precio: 13.90, imagen: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Ensalada Caprese', nombreEn: 'Caprese Salad', descripcion: 'Mozzarella fresca di bufala, tomate corazón de buey y albahaca con reducción de balsámico.', descripcionEn: 'Fresh buffalo mozzarella, beefsteak tomato, and basil with balsamic reduction.', precio: 10.50, imagen: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Sopa Minestrone', nombreEn: 'Minestrone Soup', descripcion: 'Sopa tradicional italiana de verduras de temporada con pasta corta y parmesano.', descripcionEn: 'Traditional Italian soup with seasonal vegetables, short pasta, and Parmesan.', precio: 8.90, imagen: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Antipasto Misto', nombreEn: 'Mixed Antipasto', descripcion: 'Selección de embutidos italianos, quesos curados, aceitunas y verduras marinadas.', descripcionEn: 'Selection of Italian cured meats, aged cheeses, olives, and marinated vegetables.', precio: 14.50, imagen: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Crema di Zucca', nombreEn: 'Roasted Pumpkin Cream Soup', descripcion: 'Crema suave de calabaza asada con un toque de nuez moscada y crujiente de panceta.', descripcionEn: 'Smooth roasted pumpkin cream soup with a touch of nutmeg and crispy pancetta.', precio: 9.20, imagen: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Ensalada César Italiana', nombreEn: 'Italian Caesar Salad', descripcion: 'Lechuga romana, pollo a la plancha, crostini, parmesano y nuestra salsa César casera.', descripcionEn: 'Romaine lettuce, grilled chicken, crostini, Parmesan, and our homemade Caesar dressing.', precio: 11.90, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Gazpacho Mediterráneo', nombreEn: 'Mediterranean Gazpacho', descripcion: 'Gazpacho frío de tomate con pepino, pimiento y un chorrito de aceite de albahaca.', descripcionEn: 'Cold tomato gazpacho with cucumber, pepper, and a drizzle of basil oil.', precio: 8.50, imagen: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Croquetas de Boletus', nombreEn: 'Porcini Mushroom Croquettes', descripcion: 'Croquetas cremosas de boletus edulis con bechamel de trufa negra.', descripcionEn: 'Creamy porcini mushroom croquettes with black truffle bechamel.', precio: 10.90, imagen: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },
    { nombre: 'Vitello Tonnato', nombreEn: 'Vitello Tonnato', descripcion: 'Finas láminas de ternera fría con salsa de atún, alcaparras y anchoas.', descripcionEn: 'Thin slices of cold veal with tuna sauce, capers, and anchovies.', precio: 12.50, imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60', categoria: 'Entrantes' },

    // --- PRINCIPALES ---
    { nombre: 'Pizza Margherita', nombreEn: 'Margherita Pizza', descripcion: 'La clásica napolitana con salsa de tomate San Marzano, mozzarella fior di latte y albahaca.', descripcionEn: 'The classic Neapolitan with San Marzano tomato sauce, fior di latte mozzarella, and basil.', precio: 12.90, imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Spaghetti Carbonara', nombreEn: 'Spaghetti Carbonara', descripcion: 'Spaghetti al dente con guanciale crujiente, yema de huevo, pecorino romano y pimienta negra.', descripcionEn: 'Al dente spaghetti with crispy guanciale, egg yolk, pecorino romano, and black pepper.', precio: 14.50, imagen: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Risotto ai Funghi Porcini', nombreEn: 'Porcini Mushroom Risotto', descripcion: 'Arroz carnaroli cremoso con boletus, mantequilla y parmesano reggiano 24 meses.', descripcionEn: 'Creamy carnaroli rice with porcini mushrooms, butter, and 24-month aged Parmigiano Reggiano.', precio: 16.90, imagen: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Lasagna della Nonna', nombreEn: 'Grandma\'s Lasagna', descripcion: 'Lasaña tradicional con ragú boloñés casero, bechamel y parmesano gratinado.', descripcionEn: 'Traditional lasagna with homemade Bolognese ragu, bechamel, and gratinated Parmesan.', precio: 15.50, imagen: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Ossobuco alla Milanese', nombreEn: 'Ossobuco Milanese Style', descripcion: 'Jarrete de ternera braseado lentamente con gremolata y risotto azafranado.', descripcionEn: 'Slowly braised veal shank with gremolata and saffron risotto.', precio: 22.90, imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Penne all\'Arrabbiata', nombreEn: 'Penne all\'Arrabbiata', descripcion: 'Penne rigate con salsa de tomate picante, ajo y guindilla calabresa.', descripcionEn: 'Penne rigate with spicy tomato sauce, garlic, and Calabrian chili pepper.', precio: 11.90, imagen: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Saltimbocca alla Romana', nombreEn: 'Saltimbocca alla Romana', descripcion: 'Escalope de ternera con jamón de Parma, salvia y salsa de vino blanco.', descripcionEn: 'Veal escalope with Parma ham, sage, and white wine sauce.', precio: 19.50, imagen: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Ravioli di Ricotta e Spinaci', nombreEn: 'Ricotta and Spinach Ravioli', descripcion: 'Ravioli caseros rellenos de ricotta y espinacas con salsa de mantequilla y salvia.', descripcionEn: 'Homemade ravioli stuffed with ricotta and spinach in a butter and sage sauce.', precio: 15.90, imagen: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Pollo alla Parmigiana', nombreEn: 'Chicken Parmigiana', descripcion: 'Pechuga de pollo empanada con salsa pomodoro, mozzarella fundida y albahaca.', descripcionEn: 'Breaded chicken breast with pomodoro sauce, melted mozzarella, and basil.', precio: 16.50, imagen: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },
    { nombre: 'Salmone al Forno', nombreEn: 'Oven-Baked Salmon', descripcion: 'Lomo de salmón al horno con costra de hierbas, espárragos trigueros y puré de patata.', descripcionEn: 'Oven-baked salmon fillet with herb crust, wild asparagus, and mashed potatoes.', precio: 18.90, imagen: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=60', categoria: 'Principales' },

    // --- PARA COMPARTIR ---
    { nombre: 'Tabla de Quesos Italianos', nombreEn: 'Italian Cheese Board', descripcion: 'Selección de parmigiano, gorgonzola, pecorino y taleggio con membrillo y nueces.', descripcionEn: 'Selection of Parmigiano, Gorgonzola, Pecorino, and Taleggio with quince paste and walnuts.', precio: 18.90, imagen: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Focaccia al Rosmarino', nombreEn: 'Rosemary Focaccia', descripcion: 'Focaccia artesanal con romero fresco, sal Maldon y aceite de oliva virgen extra.', descripcionEn: 'Artisan focaccia with fresh rosemary, Maldon salt, and extra virgin olive oil.', precio: 6.90, imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Patatas Trufadas', nombreEn: 'Truffle Fries', descripcion: 'Patatas fritas crujientes con aceite de trufa negra, parmesano rallado y perejil.', descripcionEn: 'Crispy fries with black truffle oil, grated Parmesan, and parsley.', precio: 9.50, imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Olivas Marinadas', nombreEn: 'Marinated Olives', descripcion: 'Mezcla de aceitunas italianas marinadas con hierbas provenzales, ajo y cítricos.', descripcionEn: 'Mix of Italian olives marinated with Provencal herbs, garlic, and citrus.', precio: 5.90, imagen: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Pan con Tomate y Jamón', nombreEn: 'Bread with Tomato and Ham', descripcion: 'Pan cristal tostado con tomate rallado, jamón serrano y aceite de oliva.', descripcionEn: 'Toasted crystal bread with grated tomato, Serrano ham, and olive oil.', precio: 8.50, imagen: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Hummus Mediterráneo', nombreEn: 'Mediterranean Hummus', descripcion: 'Hummus casero de garbanzos con pimentón ahumado, piñones y pan de pita.', descripcionEn: 'Homemade chickpea hummus with smoked paprika, pine nuts, and pita bread.', precio: 8.90, imagen: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Tabla de Embutidos', nombreEn: 'Charcuterie Board', descripcion: 'Prosciutto di Parma, salami Milano, mortadela y bresaola con grisines.', descripcionEn: 'Prosciutto di Parma, Milano salami, mortadella, and bresaola with breadsticks.', precio: 16.90, imagen: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Arancini Siciliani', nombreEn: 'Sicilian Arancini', descripcion: 'Bolas de arroz rellenas de ragú y mozzarella, fritas hasta dorar.', descripcionEn: 'Rice balls stuffed with ragu and mozzarella, fried until golden.', precio: 10.50, imagen: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Tapas de Calamares', nombreEn: 'Calamari Tapas', descripcion: 'Calamares a la romana con alioli de limón y perejil fresco.', descripcionEn: 'Roman-style fried calamari with lemon aioli and fresh parsley.', precio: 11.50, imagen: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },
    { nombre: 'Focaccia Rellena de Queso', nombreEn: 'Cheese-Stuffed Focaccia', descripcion: 'Focaccia crujiente rellena de stracchino y rúcula con tomate seco.', descripcionEn: 'Crispy focaccia stuffed with stracchino and arugula with sun-dried tomato.', precio: 9.90, imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?auto=format&fit=crop&w=500&q=60', categoria: 'Para Compartir' },

    // --- POSTRES ---
    { nombre: 'Tiramisú Clásico', nombreEn: 'Classic Tiramisu', descripcion: 'Nuestro tiramisú casero con mascarpone, café expreso y cacao amargo.', descripcionEn: 'Our homemade tiramisu with mascarpone, espresso coffee, and dark cocoa.', precio: 8.50, imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Panna Cotta ai Frutti di Bosco', nombreEn: 'Panna Cotta with Mixed Berries', descripcion: 'Panna cotta de vainilla con coulis de frutos rojos y menta fresca.', descripcionEn: 'Vanilla panna cotta with mixed berry coulis and fresh mint.', precio: 7.90, imagen: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Cannoli Siciliani', nombreEn: 'Sicilian Cannoli', descripcion: 'Tubos crujientes rellenos de crema de ricotta con pistachos y chocolate.', descripcionEn: 'Crispy tubes filled with ricotta cream, pistachios, and chocolate.', precio: 7.50, imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Tarta de Limón', nombreEn: 'Lemon Tart', descripcion: 'Tarta de limón con merengue italiano tostado y ralladura de limón.', descripcionEn: 'Lemon tart with toasted Italian meringue and lemon zest.', precio: 8.90, imagen: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Gelato Artesanal', nombreEn: 'Artisan Gelato', descripcion: 'Tres bolas de helado artesano a elegir: pistacho, stracciatella o avellana.', descripcionEn: 'Three scoops of artisan gelato of your choice: pistachio, stracciatella, or hazelnut.', precio: 6.90, imagen: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Brownie con Gelato', nombreEn: 'Brownie with Gelato', descripcion: 'Brownie templado de chocolate negro 70% con helado de vainilla y nueces caramelizadas.', descripcionEn: 'Warm 70% dark chocolate brownie with vanilla gelato and caramelized walnuts.', precio: 9.50, imagen: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Mousse de Chocolate', nombreEn: 'Chocolate Mousse', descripcion: 'Mousse aireada de chocolate belga con virutas de chocolate blanco.', descripcionEn: 'Airy Belgian chocolate mousse with white chocolate shavings.', precio: 8.20, imagen: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Flan de Vainilla', nombreEn: 'Vanilla Flan', descripcion: 'Flan casero de vainilla bourbon con caramelo tostado y nata montada.', descripcionEn: 'Homemade bourbon vanilla flan with toasted caramel and whipped cream.', precio: 6.50, imagen: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
    { nombre: 'Tarta de Manzana', nombreEn: 'Apple Tart', descripcion: 'Tarta rústica de manzana caramelizada con canela, servida tibia con helado.', descripcionEn: 'Rustic caramelized apple tart with cinnamon, served warm with gelato.', precio: 8.90, imagen: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=500&q=60', categoria: 'Postres' },
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
      n.includes('carpaccio') ||
      n.includes('antipasto') ||
      n.includes('sopa') ||
      n.includes('crema') ||
      n.includes('gazpacho') ||
      n.includes('croqueta')
    )
      return 'Entrantes';

    if (
      n.includes('tiramis') ||
      n.includes('postre') ||
      n.includes('tarta') ||
      n.includes('panna cotta') ||
      n.includes('helado') ||
      n.includes('cannoli') ||
      n.includes('brownie') ||
      n.includes('flan') ||
      n.includes('mousse') ||
      n.includes('gelato')
    )
      return 'Postres';

    if (
      n.includes('tabla') ||
      n.includes('compartir') ||
      n.includes('nachos') ||
      n.includes('patatas') ||
      n.includes('pan') ||
      n.includes('focaccia') ||
      n.includes('hummus') ||
      n.includes('tapas') ||
      n.includes('olivas') ||
      n.includes('queso')
    )
      return 'Para Compartir';

    return 'Principales';
  }

  asignarImagen(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('pizza'))
      return 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('spaghetti') || nombreLower.includes('Spaghetti Carbonara'))
      return 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('ensalada'))
      return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('tiramis') || nombreLower.includes('postre'))
      return 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60';
    if (nombreLower.includes('risotto') || nombreLower.includes('arroz'))
      return 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60';

    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60';
  }
}
