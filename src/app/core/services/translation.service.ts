import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const ES: Record<string, string> = {
  // Header
  'header.home': 'Inicio',
  'header.menu': 'Nuestra Carta',
  'header.reservations': 'Reservas',
  'header.about': 'Nosotros',
  'header.contact': 'Contacto',

  // Home
  'home.hero_title': 'Sabores que cuentan<br>una historia',
  'home.hero_subtitle': 'Una experiencia culinaria única inspirada en la tradición mediterránea y los ingredientes más frescos de nuestra tierra.',
  'home.reserve': 'Reservar Mesa',
  'home.see_menu': 'Ver Menú',
  'home.since': 'DESDE 1984',
  'home.heritage_title': 'Nuestra Herencia',
  'home.heritage_p1': 'Desde nuestros humildes comienzos, hemos buscado honrar las recetas tradicionales transmitidas por generaciones, elevándolas con un toque contemporáneo y una pasión inigualable por el detalle.',
  'home.heritage_p2': 'Creemos que la cocina es el alma de un hogar, y nuestro restaurante es el hogar donde compartimos la esencia de la dieta mediterránea: salud, sabor y celebración.',
  'home.heritage_btn': 'Conoce nuestra historia',
  'home.cta_title': '¿Listo para una experiencia<br>inolvidable?',
  'home.cta_subtitle': 'Asegure su mesa hoy mismo y déjenos sorprenderle con lo mejor de nuestra cocina en un ambiente íntimo y acogedor.',
  'home.see_full_menu': 'Ver Menú Completo',
  'home.hero_label': 'Desde 1984 · Madrid',
  'home.scroll_discover': 'Descubre',
  'home.counter_years': 'Años de Historia',
  'home.counter_michelin': 'Estrella Michelin',
  'home.counter_guests': 'Clientes Satisfechos',
  'home.counter_recipes': 'Recetas Originales',
  'home.stats_reviews': 'Google Reviews',
  'home.stats_michelin': 'Estrella Michelin',
  'home.stats_wines': 'Vinos Premium',
  'home.stats_local': 'Producto Local',
  'home.testimonials_title': 'Lo Que Dicen Nuestros Clientes',
  'home.testimonial1_text': 'Una experiencia gastronómica sublime. Cada plato es una obra de arte que honra la tradición italiana con un toque contemporáneo brillante.',
  'home.testimonial1_author': 'María García López',
  'home.testimonial1_source': 'Google Reviews',
  'home.testimonial2_text': 'El mejor restaurante italiano de Madrid, sin duda. El risotto de setas es simplemente perfecto y el servicio es impecable.',
  'home.testimonial2_author': 'Carlos Ruiz Martínez',
  'home.testimonial2_source': 'TripAdvisor',
  'home.testimonial3_text': 'Llevamos viniendo más de 10 años y nunca decepciona. La pasta fresca y los postres caseros son extraordinarios.',
  'home.testimonial3_author': 'Elena Fernández Díaz',
  'home.testimonial3_source': 'El Tenedor',

  // Menu
  'menu.label': 'NUESTRA CARTA',
  'menu.title': 'Nuestra Carta',
  'menu.subtitle': 'Sabores auténticos de Italia',
  'menu.season': 'Temporada Invierno 2026',
  'menu.all': 'Todos',
  'menu.starters': 'Entrantes',
  'menu.mains': 'Principales',
  'menu.sharing': 'Para Compartir',
  'menu.desserts': 'Postres',
  'menu.add_order': 'Añadir al pedido',
  'menu.default_desc': 'Delicioso plato preparado al momento.',

  // Reservations
  'res.subtitle': 'RESERVA TU MESA',
  'res.title': 'Una Velada Inolvidable',
  'res.desc': 'Asegure su experiencia gastronómica con nosotros.',
  'res.name': 'Nombre Completo',
  'res.email': 'Correo Electrónico',
  'res.date': 'Fecha',
  'res.time': 'Hora',
  'res.table': 'Número de Mesa',
  'res.confirm': 'CONFIRMAR RESERVA',
  'res.selection': 'Tu Selección',
  'res.total': 'Total Pre-pedido:',
  'res.note': '* El pago de las consumiciones se realizará en el restaurante.',
  'res.change': 'Cambiar selección',
  'res.success': '¡Reserva confirmada con éxito!',
  'res.error_fields': 'Por favor completa todos los campos',
  'res.error_process': 'Error al procesar la reserva',
  'res.name_placeholder': 'Ej. Juan Pérez',
  'res.email_placeholder': 'ejemplo@correo.com',
  'res.table_placeholder': 'Ej. 3',
  'res.guests': 'Número de Comensales',
  'res.table_pref': 'Preferencia de Mesa',
  'res.notes': 'Observaciones',
  'res.step1': 'Datos',
  'res.step2': 'Preferencias',
  'res.step3': 'Confirmación',
  'res.guests_placeholder': 'Seleccionar',
  'res.pref_interior': 'Interior',
  'res.pref_terrace': 'Terraza',
  'res.pref_bar': 'Barra',
  'res.pref_private': 'Salón Privado',
  'res.notes_placeholder': 'Alergias, celebraciones especiales...',
  'res.confirmed': '✓ RESERVA CONFIRMADA',

  // About
  'about.essence': 'NUESTRA ESENCIA',
  'about.art_title': 'El Arte de la Mesa',
  'about.tradition_title': 'Tradición Familiar',
  'about.tradition_p': 'Fundada en 1984, La Tavola nació del sueño de compartir las recetas secretas de nuestra *nonna*. Lo que comenzó como un pequeño local con tres mesas se ha convertido en un referente de la cocina italiana auténtica.',
  'about.passion_title': 'Pasión por el Producto',
  'about.passion_p': 'No creemos en los atajos. Importamos nuestro propio aceite de oliva de la Toscana y seleccionamos diariamente las hortalizas de productores locales para asegurar que cada bocado sea un viaje al Mediterráneo.',

  // Contact
  'contact.find_us': 'ENCUÉNTRANOS',
  'contact.title': 'Contacto & Ubicación',
  'contact.address': 'Dirección',
  'contact.address_detail': 'Calle de la Tradición, 12, 28001 Madrid, España',
  'contact.phone': 'Teléfono',
  'contact.phone_detail': '+34 912 345 678',
  'contact.email_label': 'Email',
  'contact.email_detail': 'reservas@latavola.com',
  'contact.schedule': 'Horario',
  'contact.schedule_detail': 'Martes a Domingo: 13:00 - 16:00 | 20:00 - 23:30',
  'contact.closed': 'Lunes cerrado por descanso',

  // Login
  'login.email': 'CORREO ELECTRÓNICO',
  'login.password': 'CONTRASEÑA',
  'login.forgot': 'OLVIDÉ MI CLAVE',
  'login.signin': 'INICIAR SESIÓN',
  'login.no_access': '¿No tienes acceso?',
  'login.contact_admin': 'Contacta al administrador',
  'login.user_placeholder': 'usuario',
  'login.pass_placeholder': 'contraseña',

  // Chat
  'chat.title': 'Asistente La Tavola',
  'chat.subtitle': '¿En qué puedo ayudarte hoy?',
  'chat.placeholder': 'Escribe tu duda...',
  'chat.send': 'Enviar',
  'chat.welcome': '¡Bienvenido a La Tavola! ¿En qué puedo ayudarte?',
  'chat.schedule_response': 'Abrimos de Martes a Domingo, de 13:00 a 16:00 y de 20:00 a 23:30. 🍷',
  'chat.recommend_response': 'Nuestra especialidad hoy es el Risotto de Setas. ¡Está espectacular! 🍄',
  'chat.default_response': 'Entiendo. Si quieres reservar, pulsa en la sección de Reservas del menú superior.',

  // Footer
  'footer.tagline': '360 RESTAURANT MANAGEMENT',
  'footer.desc': 'Una experiencia gastronómica dedicada a la excelencia, la tradición mediterránea y el buen gusto.',
  'footer.legal': 'Aviso Legal',
  'footer.privacy': 'Política de Privacidad',
  'footer.cookies': 'Cookies',
  'footer.allergens': 'Alérgenos',
  'footer.staff': 'Acceso Staff',
  'footer.nav_title': 'Navegación',
  'footer.hours_title': 'Horario',
  'footer.hours_lunch': 'Almuerzo: 13:00 - 16:00',
  'footer.hours_dinner': 'Cena: 20:00 - 23:30',
  'footer.hours_closed': 'Lunes: Cerrado',
  'footer.contact_title': 'Contacto',
  'footer.address': 'C/ de la Tradición, 12, Madrid',
  'footer.phone': '+34 912 345 678',
  'footer.email': 'reservas@latavola.com',
  'footer.copyright': '© 2026 La Tavola Restaurant. Todos los derechos reservados.',
};

const EN: Record<string, string> = {
  // Header
  'header.home': 'Home',
  'header.menu': 'Our Menu',
  'header.reservations': 'Reservations',
  'header.about': 'About Us',
  'header.contact': 'Contact',

  // Home
  'home.hero_title': 'Flavors that tell<br>a story',
  'home.hero_subtitle': 'A unique culinary experience inspired by Mediterranean tradition and the freshest ingredients from our land.',
  'home.reserve': 'Book a Table',
  'home.see_menu': 'View Menu',
  'home.since': 'SINCE 1984',
  'home.heritage_title': 'Our Heritage',
  'home.heritage_p1': 'From our humble beginnings, we have sought to honor traditional recipes passed down through generations, elevating them with a contemporary touch and an unmatched passion for detail.',
  'home.heritage_p2': 'We believe the kitchen is the soul of a home, and our restaurant is the home where we share the essence of the Mediterranean diet: health, flavor, and celebration.',
  'home.heritage_btn': 'Discover our story',
  'home.cta_title': 'Ready for an unforgettable<br>experience?',
  'home.cta_subtitle': 'Secure your table today and let us surprise you with the best of our cuisine in an intimate and welcoming atmosphere.',
  'home.see_full_menu': 'View Full Menu',
  'home.hero_label': 'Since 1984 · Madrid',
  'home.scroll_discover': 'Discover',
  'home.counter_years': 'Years of History',
  'home.counter_michelin': 'Michelin Star',
  'home.counter_guests': 'Happy Guests',
  'home.counter_recipes': 'Original Recipes',
  'home.stats_reviews': 'Google Reviews',
  'home.stats_michelin': 'Michelin Star',
  'home.stats_wines': 'Premium Wines',
  'home.stats_local': 'Local Product',
  'home.testimonials_title': 'What Our Guests Say',
  'home.testimonial1_text': 'A sublime dining experience. Every dish is a work of art that honors Italian tradition with a brilliant contemporary touch.',
  'home.testimonial1_author': 'María García López',
  'home.testimonial1_source': 'Google Reviews',
  'home.testimonial2_text': 'The best Italian restaurant in Madrid, without a doubt. The mushroom risotto is simply perfect and the service is impeccable.',
  'home.testimonial2_author': 'Carlos Ruiz Martínez',
  'home.testimonial2_source': 'TripAdvisor',
  'home.testimonial3_text': 'We have been coming for over 10 years and it never disappoints. The fresh pasta and homemade desserts are extraordinary.',
  'home.testimonial3_author': 'Elena Fernández Díaz',
  'home.testimonial3_source': 'El Tenedor',

  // Menu
  'menu.label': 'OUR MENU',
  'menu.title': 'Our Menu',
  'menu.subtitle': 'Authentic Italian flavors',
  'menu.season': 'Winter Season 2026',
  'menu.all': 'All',
  'menu.starters': 'Starters',
  'menu.mains': 'Mains',
  'menu.sharing': 'Sharing',
  'menu.desserts': 'Desserts',
  'menu.add_order': 'Add to order',
  'menu.default_desc': 'Delicious freshly prepared dish.',

  // Reservations
  'res.subtitle': 'BOOK YOUR TABLE',
  'res.title': 'An Unforgettable Evening',
  'res.desc': 'Secure your dining experience with us.',
  'res.name': 'Full Name',
  'res.email': 'Email',
  'res.date': 'Date',
  'res.time': 'Time',
  'res.table': 'Table Number',
  'res.confirm': 'CONFIRM RESERVATION',
  'res.selection': 'Your Selection',
  'res.total': 'Pre-order Total:',
  'res.note': '* Payment will be made at the restaurant.',
  'res.change': 'Change selection',
  'res.success': 'Reservation confirmed successfully!',
  'res.error_fields': 'Please fill in all fields',
  'res.error_process': 'Error processing reservation',
  'res.name_placeholder': 'e.g. John Smith',
  'res.email_placeholder': 'example@email.com',
  'res.table_placeholder': 'e.g. 3',
  'res.guests': 'Number of Guests',
  'res.table_pref': 'Table Preference',
  'res.notes': 'Special Requests',
  'res.step1': 'Details',
  'res.step2': 'Preferences',
  'res.step3': 'Confirmation',
  'res.guests_placeholder': 'Select',
  'res.pref_interior': 'Interior',
  'res.pref_terrace': 'Terrace',
  'res.pref_bar': 'Bar',
  'res.pref_private': 'Private Room',
  'res.notes_placeholder': 'Allergies, special celebrations...',
  'res.confirmed': '✓ RESERVATION CONFIRMED',

  // About
  'about.essence': 'OUR ESSENCE',
  'about.art_title': 'The Art of the Table',
  'about.tradition_title': 'Family Tradition',
  'about.tradition_p': 'Founded in 1984, La Tavola was born from the dream of sharing our *nonna\'s* secret recipes. What began as a small venue with three tables has become a benchmark for authentic Italian cuisine.',
  'about.passion_title': 'Passion for Quality',
  'about.passion_p': 'We don\'t believe in shortcuts. We import our own olive oil from Tuscany and daily select vegetables from local producers to ensure every bite is a journey to the Mediterranean.',

  // Contact
  'contact.find_us': 'FIND US',
  'contact.title': 'Contact & Location',
  'contact.address': 'Address',
  'contact.address_detail': 'Calle de la Tradición, 12, 28001 Madrid, Spain',
  'contact.phone': 'Phone',
  'contact.phone_detail': '+34 912 345 678',
  'contact.email_label': 'Email',
  'contact.email_detail': 'reservas@latavola.com',
  'contact.schedule': 'Schedule',
  'contact.schedule_detail': 'Tuesday to Sunday: 1:00 PM - 4:00 PM | 8:00 PM - 11:30 PM',
  'contact.closed': 'Closed on Mondays',

  // Login
  'login.email': 'EMAIL',
  'login.password': 'PASSWORD',
  'login.forgot': 'FORGOT PASSWORD',
  'login.signin': 'SIGN IN',
  'login.no_access': 'No access?',
  'login.contact_admin': 'Contact the administrator',
  'login.user_placeholder': 'username',
  'login.pass_placeholder': 'password',

  // Chat
  'chat.title': 'La Tavola Assistant',
  'chat.subtitle': 'How can I help you today?',
  'chat.placeholder': 'Type your question...',
  'chat.send': 'Send',
  'chat.welcome': 'Welcome to La Tavola! How can I help you?',
  'chat.schedule_response': 'We\'re open Tuesday to Sunday, from 1:00 PM to 4:00 PM and 8:00 PM to 11:30 PM. 🍷',
  'chat.recommend_response': 'Today\'s specialty is the Mushroom Risotto. It\'s spectacular! 🍄',
  'chat.default_response': 'I see. To make a reservation, click on the Reservations section in the top menu.',

  // Footer
  'footer.tagline': '360 RESTAURANT MANAGEMENT',
  'footer.desc': 'A dining experience dedicated to excellence, Mediterranean tradition, and good taste.',
  'footer.legal': 'Legal Notice',
  'footer.privacy': 'Privacy Policy',
  'footer.cookies': 'Cookies',
  'footer.allergens': 'Allergens',
  'footer.staff': 'Staff Access',
  'footer.nav_title': 'Navigation',
  'footer.hours_title': 'Hours',
  'footer.hours_lunch': 'Lunch: 1:00 PM - 4:00 PM',
  'footer.hours_dinner': 'Dinner: 8:00 PM - 11:30 PM',
  'footer.hours_closed': 'Monday: Closed',
  'footer.contact_title': 'Contact',
  'footer.address': 'C/ de la Tradición, 12, Madrid',
  'footer.phone': '+34 912 345 678',
  'footer.email': 'reservas@latavola.com',
  'footer.copyright': '© 2026 La Tavola Restaurant. All rights reserved.',
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private langSubject = new BehaviorSubject<'es' | 'en'>('es');
  lang$ = this.langSubject.asObservable();

  get currentLang(): 'es' | 'en' {
    return this.langSubject.value;
  }

  setLang(lang: 'es' | 'en'): void {
    this.langSubject.next(lang);
  }

  toggleLang(): void {
    this.langSubject.next(this.currentLang === 'es' ? 'en' : 'es');
  }

  t(key: string): string {
    const dict = this.currentLang === 'es' ? ES : EN;
    return dict[key] || key;
  }
}
