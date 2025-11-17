import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EnviorementsService } from '../../../services/enviorements.service';

@Component({
  selector: 'app-user-reserves',
  imports: [CommonModule],
  templateUrl: './user-reserves.component.html',
  styleUrl: './user-reserves.component.css'
})
export class UserReservesComponent {
  private enviorementsService = inject(EnviorementsService)
  enviorements: any[] = [];

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
  }
}

