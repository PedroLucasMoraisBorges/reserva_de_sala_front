import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EnviorementsService } from '../../../services/enviorements.service';
import { RouterLink } from "@angular/router";
import { AuthenticationService } from '../../../services/authentication.service';
import { ReservationService } from '../../../services/reservation-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BuildingsService } from '../../../services/buildings.service';

@Component({
  selector: 'app-user-reserves',
  imports: [CommonModule, RouterLink, MatSnackBarModule],
  templateUrl: './user-reserves.component.html',
  styleUrl: './user-reserves.component.css'
})
export class UserReservesComponent {
  private enviorementsService = inject(EnviorementsService)
  private reservationService = inject(ReservationService)
  private authService = inject(AuthenticationService)
  private snackBar = inject(MatSnackBar)
  private buildingService = inject(BuildingsService)
  enviorements: any[] = [];
  reservations: any[] = []
  formattedReserves: any[] = []
  formattedEnviorements: any[] = []
  user: any = {}

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

  formatReserves() {
    this.formattedReserves = [];

    for (const item of this.reservations) {
      this.enviorementsService.getEnviorementById(item.room.id).subscribe({
        next: (res) => {
          const enviorement = res.enviorement;


          const dateObj = new Date(item.date);
          const formattedDate = new Date(item.date + "T00:00:00").toLocaleDateString("pt-BR");

          const firstSchedule = item.schedules
            .map((s: any) => s.entryTime)
            .sort()[0]
            .slice(0, 5);


          const formatted = {
            id: item.id,
            enviorementName: enviorement.name,
            date: formattedDate,
            firstSchedule: firstSchedule,
            original: item
          };

          this.formattedReserves.push(formatted);
        }
      });
    }
  }


  formatEnviorements() {
    for (const item of this.enviorements) {
      this.buildingService.getBuildingById(item.fk_build).subscribe({
        next: (res) => {
          item.fk_build = res.building.name
          this.formattedEnviorements.push(item)
        }
      })
    }
  }

  ngOnInit() {
    this.enviorementsService.getEnviorements().subscribe({
      next: (res) => {
        this.enviorements = res.environment || []
        this.formatEnviorements()
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
        this.formatReserves()
      }
    })
  }
}

