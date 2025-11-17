import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/reservation-service.service';
import { EnviorementsService } from '../../../services/enviorements.service';

@Component({
  selector: 'app-enviorement-page',
  imports: [],
  templateUrl: './enviorement-page.component.html',
  styleUrl: './enviorement-page.component.css'
})
export class EnviorementPageComponent {
  private route = inject(ActivatedRoute);
  private reservationService = inject(ReservationService)
  private enviorementService = inject(EnviorementsService)

  enviorement: any = {}
  reservations: any[] = []
  id = this.route.snapshot.paramMap.get('id')

  ngOnInit() {
    this.reservationService.getSchedules(this.id).subscribe({
      next: (res) => {
        console.log(res)
      }
    })

    this.enviorementService.getEnviorementById(this.id).subscribe({
      next: (res) => {
        console.log(res)
        this.enviorement = res.enviorement
      }
    })
  }
}
