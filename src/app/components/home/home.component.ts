import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviorementsService } from '../../services/enviorements.service';
import { FormsModule } from '@angular/forms';
import { BuildingsService } from '../../services/buildings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private enviorementsService = inject(EnviorementsService);
  private buildingsService = inject(BuildingsService);
  private toastr = inject(ToastrService);

  reservedEnviorements: number = 0;
  canceledReserves: number = 0;
  activeEnviorements: number = 0;

  enviorements: any[] = [];
  buildings: any[] = [];
  selectedEnviorement: any = null;
  editMode: boolean = false;
  addNewEnviorement: boolean = false;


  handleAddNewEnviorement(){
    this.addNewEnviorement = !this.addNewEnviorement;
    this.selectedEnviorement = {};
  }

  handleEditEnviorement(item: any) {
    this.selectedEnviorement = { ...item };
    this.editMode = true;
    this.addNewEnviorement = true;
  }

  closeModal() {
    this.addNewEnviorement = false;
    this.editMode = false;
    this.selectedEnviorement = null;
  }

  reloadEnvs() {
  this.enviorementsService.getEnviorements().subscribe({
    next: (res) => {
      this.enviorements = res.environment || [];
    }
  });
}

  deleteEnviorement(id: string) {
    this.enviorementsService.deleteEnviorement(id).subscribe({
      next: () => {
        this.reloadEnvs();
      }
    })
  }
  saveEnviorement() {
    const payload = {
      name: this.selectedEnviorement.name,
      fk_build: this.selectedEnviorement.fk_build,
      floor: this.selectedEnviorement.floor,
      description: this.selectedEnviorement.description
    };

    if (this.editMode) {
      this.enviorementsService.updateEnviorement(this.selectedEnviorement.id, payload)
        .subscribe({
          next: () => {
            this.closeModal();
            this.reloadEnvs();
            // this.toastr.success('Ambiente removido com sucesso');
          },
          error: () => console.log('Erro ao atualizar ambiente')
        });
    } else {
        this.enviorementsService.createEnviorement(payload)
          .subscribe({
            next: () => {
              this.closeModal();
              this.reloadEnvs();
            },
            error: () => console.log('Erro ao criar ambiente')
          });
      }
  }

  ngOnInit() {
    this.buildingsService.getAllBuildings().subscribe({
      next: (res) => {
        this.buildings = res.buildings || [];
      },
      error: () => {
        console.log('Erro ao carregar os prédios');
      }
    });

    this.enviorementsService.getEnviorements().subscribe({
      next: (res) => {
        this.enviorements = res.environment;
        console.log('Ambientes carregados:', this.enviorements);
      },
      error: () => {
        console.log('Erro ao carregar os ambientes');
      }
    });
  }
}
