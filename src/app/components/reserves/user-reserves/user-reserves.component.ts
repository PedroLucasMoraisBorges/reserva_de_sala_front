import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EnviorementsService } from '../../../services/enviorements.service';
import { RouterLink } from "@angular/router";
import { AuthenticationService } from '../../../services/authentication.service';
import { ReservationService } from '../../../services/reservation-service.service';

@Component({
  selector: 'app-user-reserves',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-reserves.component.html',
  styleUrl: './user-reserves.component.css'
})
export class UserReservesComponent {
  private enviorementsService = inject(EnviorementsService)
  private reservationService = inject(ReservationService)
  private authService = inject(AuthenticationService)
  enviorements: any[] = [];
  reservations: any[] = []
  formattedReserves: any[] = []

  cancelReserves(id:string) {
    this.reservationService.cancelReserve(id).subscribe({
      next: (res) =>{
        console.log('jjj')
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
  ngOnInit() {
    this.enviorementsService.getEnviorements().subscribe({
      next: (res) => {
        console.log(res)
        this.enviorements = res.environment || []
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
      next: (res1) => {
        this.reservationService.getUserReservations(res1.id).subscribe({
          next: (res) => {
            this.reservations = res.userReserves.actives
            this.formatReserves()
          }
        })
      }})
  }
}

