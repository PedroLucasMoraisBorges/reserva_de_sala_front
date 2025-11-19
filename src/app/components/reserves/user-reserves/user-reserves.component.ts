import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EnviorementsService } from '../../../services/enviorements.service';
import { RouterLink } from "@angular/router";
import { AuthenticationService } from '../../../services/authentication.service';
import { ReservationService } from '../../../services/reservation-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BuildingsService } from '../../../services/buildings.service';
import { DatePipe } from '../../../pipes/date.pipe';
import { EnviorementPipe } from '../../../pipes/enviorement.pipe';
import { FirstSchedulePipe } from '../../../pipes/first-schedule.pipe';
import { BuildingNamePipe } from '../../../pipes/building-name.pipe';

@Component({
  selector: 'app-user-reserves',
  imports: [CommonModule, RouterLink, MatSnackBarModule, DatePipe, EnviorementPipe, FirstSchedulePipe, BuildingNamePipe],
  templateUrl: './user-reserves.component.html',
  styleUrl: './user-reserves.component.css'
})
export class UserReservesComponent {
  private enviorementsService = inject(EnviorementsService)
  private reservationService = inject(ReservationService)
  private authService = inject(AuthenticationService)
  private snackBar = inject(MatSnackBar)
  enviorements: any[] = [];
  filteredEnviorements: any[] = []
  reservations: any[] = []
  user: any = {}

  searchName: any = ''
  searchSize: any = ''
  searchFloor: any = ''

  cancelReserves(id:string) {
    this.reservationService.cancelReserve(id).subscribe({
      next: (res) =>{
        this.snackBar.open("Reserva cancelada com sucesso",  "Fechar" , {
          duration: 9000,
          panelClass: ['toast-info', 'toast']
        })
        this.loadReserves()
      }
    })
  }

  ngOnInit() {
    this.enviorementsService.getEnviorements().subscribe({
      next: (res) => {
        this.enviorements = res.environment || []
        this.filteredEnviorements = this.enviorements
      },
      error: () => {
        console.log('Erro ao carregar os prédios');
      }
    })

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.authService.getUserInfo(token).subscribe({
      next: (res) => {
        this.user = res
        this.loadReserves()
      }})
  }

  loadReserves() {
    this.reservationService.getUserReservations(this.user.id).subscribe({
      next: (res) => {
        this.reservations = res.userReserves.actives
      }
    })
  }

  filterEnviorements() {

    this.filteredEnviorements = this.enviorements.filter(env => {
      console.log(env)

      const matchName =
        !this.searchName || env.name.toLowerCase().includes(this.searchName);

      const matchSize =
        !this.searchSize || env.indicated_limit >= this.searchSize;

      const matchFloor =
        !this.searchFloor || env.floor == this.searchFloor;

      return matchName && matchSize && matchFloor;
    });
  }

  handleInputNameChange(event: any) {
    const value = event.target.value.toLowerCase();
    this.searchName = value
    this.filterEnviorements()
  }

  handleInputSizeChange(event: any) {
    const value = event.target.value.toLowerCase();
    this.searchSize = value
    this.filterEnviorements()
  }

  handleInputFloorChange(event: any) {
    const value = event.target.value.toLowerCase();
    this.searchFloor = value
    console.log(value)
    this.filterEnviorements()
  }
}

