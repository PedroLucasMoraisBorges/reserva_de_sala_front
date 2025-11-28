import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/reservation-service.service';
import { EnviorementsService } from '../../../services/enviorements.service';
import { FormsModule } from "@angular/forms";
import { AuthenticationService } from '../../../services/authentication.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { BuildingsService } from '../../../services/buildings.service';
import { DatePipe } from '../../../pipes/date.pipe';

@Component({
  selector: 'app-enviorement-page',
  imports: [CommonModule, FormsModule, MatSnackBarModule, DatePipe],
  templateUrl: './enviorement-page.component.html',
  styleUrl: './enviorement-page.component.css'
})
export class EnviorementPageComponent {
  private route = inject(ActivatedRoute);
  private reservationService = inject(ReservationService)
  private enviorementService = inject(EnviorementsService)
  private buildingService = inject(BuildingsService)
  private snackBar = inject(MatSnackBar)


  enviorement: any = {}
  formattedEnviorement: any = {}
  reservations: any[] = []
  schedules: any[] = []
  reservedIds = new Set<string>();
  selectedIndexes = new Set<number>();
  lastClickedIndex: number | null = null;
  selectedDate = '';
  id = this.route.snapshot.paramMap.get('id')
  authService = inject(AuthenticationService)
  user :any = {}
  initReserve: boolean = false
  dataHasSelected: boolean = false
  userReserves :any[] = []

  handleInitReserve() {
    this.initReserve = !this.initReserve
  }

  loadSchedules() {
    this.reservationService.getSchedules(this.id).subscribe({
      next: (res) => {
        this.schedules = res.schedules;
      }
    });
  }

  isReserved(index: number): boolean {
    return this.reservedIds.has(this.schedules[index].pk);
  }

  onScheduleClick(index: number) {
    if (this.isReserved(index)) return;

    if (this.lastClickedIndex === null) {
      if (this.selectedIndexes.has(index))
        this.selectedIndexes.delete(index);
      else
        this.selectedIndexes.add(index);
    } else {
      const start = Math.min(this.lastClickedIndex, index);
      const end = Math.max(this.lastClickedIndex, index);

      this.selectedIndexes.clear();

      for (let i = start; i <= end; i++) {
        if (!this.isReserved(i)) this.selectedIndexes.add(i);
      }
    }

    this.lastClickedIndex = index;
  }

  loadReservedSchedules(date: string) {
    this.reservationService.getReservedSchedules(this.id!, date).subscribe({
      next: (res) => {
        this.reservedIds = new Set(res.reserved_ids);
        this.lastClickedIndex = null;
        this.selectedIndexes.clear();
      }
    })
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedDate = target.value;
    this.dataHasSelected = true
    this.loadReservedSchedules(target.value)
  }

  saveReservation() {
    if (this.selectedIndexes.size === 0) return;

    const selectedScheduleIds = Array.from(this.selectedIndexes).map(i => this.schedules[i].pk);

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.authService.getUserInfo(token).subscribe({
      next: (res1) => {
        const payload = {
          room_id: this.id,
          date: this.selectedDate,
          schedule_ids: selectedScheduleIds,
          user_id: res1.id
        };


        this.reservationService.createReservation(payload).subscribe({
          next: (res) => {
            this.snackBar.open("Reserva criada", "Fechar", {
              duration: 9000,
              panelClass: ['toast-success', 'toast']
            })
            this.initReserve = false
            this.dataHasSelected = false
            this.loadUserReserves()
          },
          error: (err) => {
            this.snackBar.open("Erro ao criar reserva", "Fechar", {
              duration: 9000,
              panelClass: ['toast-error', 'toast']
            })
          }
        });
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.loadSchedules();
      this.loadEnviorement();
      this.loadUserReserves()
    });
  }

  loadEnviorement() {
      console.log(this.user)
      this.enviorementService.getEnviorementById(this.id).subscribe({
        next: (res) => {
          console.log(res)
          this.enviorement = res.enviorement;
          this.buildingService.getBuildingById(res.enviorement.fk_build).subscribe({
            next: (res2) => {
              this.enviorement.fk_build = res2.building.name
              this.formattedEnviorement = this.enviorement
            }
          })
        }
    });
  }

  loadUserReserves() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.authService.getUserInfo(token).subscribe({
      next: (res1) => {
          this.reservationService.getUserReservationsFromEnviorement(res1.id, this.id).subscribe({
        next: (res) => {
          this.reservations = res.userReserves
        }
      })
    }})
  }

  closeModal() {
    this.initReserve = false;
    this.dataHasSelected = false; // Reseta o estado para a próxima vez
    this.selectedIndexes.clear(); // Limpa seleções anteriores
  }

  // Quando clicar em "Alterar data" dentro do modal
  resetDate() {
    this.dataHasSelected = false;
    // O initReserve continua true, mantendo o modal aberto,
    // mas o @if do HTML vai voltar a mostrar o input de data.
  }
}
