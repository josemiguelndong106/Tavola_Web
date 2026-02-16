import { Routes } from '@angular/router';
import { ReservationsComponent } from './features/reservations/reservations.component';
import { MenuComponent } from './features/menu/menu.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component'; 
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/login/login.component';


export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'reservas', component: ReservationsComponent },
  { path: 'nosotros', component: AboutComponent },   
  { path: 'contacto', component: ContactComponent },
  { path: 'nosotros', redirectTo: 'home' }, 
  { path: 'contacto', redirectTo: 'reservas' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];