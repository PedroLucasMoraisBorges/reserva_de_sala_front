import { Component, inject, Inject } from '@angular/core';
import { EnviaFormularioService } from '../../services/envia-formulario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private enviaFormularioService = inject(EnviaFormularioService);
  reservedEnviorements: number = 0;
  canceledReserves: number = 0;
  activeEnviorements: number = 0;
  rooms: any[] = [];
  addNewEnviorement: boolean = false;

  submit(event: any){
    this.enviaFormularioService.enviaInfoBackend(this.rooms);
  }

  handleAddNewEnviorement(){
    this.addNewEnviorement = !this.addNewEnviorement;
  }
}
