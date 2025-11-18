import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterRoomComponent } from './components/register-room/register-room.component';
import { RegisterBuildingComponent } from './components/register-building/register-building.component';
import { LoginComponent } from './components/authenticate/login/login.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { CreateUserComponent } from './components/authenticate/create-user/create-user.component';
import { UserReservesComponent } from './components/reserves/user-reserves/user-reserves.component';
import { EnviorementPageComponent } from './components/reserves/enviorement-page/enviorement-page.component';
import { AuthGuard } from '../auths/auth.guard';

export const routes: Routes = [

  // --- Layout principal (com sidebar) ---
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'enviorement/register', component: RegisterRoomComponent, canActivate: [AuthGuard]  },
      { path: 'buildings', component: RegisterBuildingComponent, canActivate: [AuthGuard] },
      { path: 'reservas', component: UserReservesComponent },
      { path: 'enviorement/:id', component: EnviorementPageComponent }
    ]
  },

  // --- Layout de autenticação (sem sidebar) ---
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: CreateUserComponent}
    ]
  }

];
