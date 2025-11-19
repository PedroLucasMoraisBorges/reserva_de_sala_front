import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviorementsService } from '../../services/enviorements.service';
import { FormsModule } from '@angular/forms';
import { BuildingsService } from '../../services/buildings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuildingNamePipe } from '../../pipes/building-name.pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, BuildingNamePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private enviorementsService = inject(EnviorementsService);
  private buildingsService = inject(BuildingsService);
  private snackBar = inject(MatSnackBar)

  reservedEnviorements: number = 0;
  canceledReserves: number = 0;
  activeEnviorements: number = 0;

  enviorements: any[] = [];
  buildings: any[] = [];
  selectedEnviorement: any = null;
  editMode: boolean = false;
  addNewEnviorement: boolean = false;
  filteredEnviorements: any[] = [];


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
      this.filteredEnviorements = this.enviorements
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
      description: this.selectedEnviorement.description,
      indicated_limit: this.selectedEnviorement.indicated_limit
    };

    if (this.editMode) {
      this.enviorementsService.updateEnviorement(this.selectedEnviorement.id, payload)
        .subscribe({
          next: () => {
            this.closeModal();
            this.reloadEnvs();

            this.snackBar.open("Alteração concluída", "Fechar", {
              duration: 9000,
              panelClass: ['toast-info', 'toast']
            })
          },
          error: () => {
            this.snackBar.open("Erro ao editar sala", "Fechar", {
              duration: 9000,
              panelClass: ['toast-error', 'toast']
            })
          }
        });
    } else {
        this.enviorementsService.createEnviorement(payload)
          .subscribe({
            next: () => {
              this.closeModal();
              this.reloadEnvs();
              this.snackBar.open("Sala criada com sucesso", "Fechar", {
                duration: 9000,
                panelClass: ['toast-success', 'toast']
              })
            },
            error: () => {
              this.snackBar.open("Erro ao criar sala", "Fechar", {
                duration: 9000,
                panelClass: ['toast-error', 'toast']
              })
            }
          });
      }
  }

  handleInputChange(event: any) {
    const value = event.target.value.toLowerCase();

    this.filteredEnviorements = this.enviorements.filter(env =>
      env.name.toLowerCase().includes(value)
    );
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
        this.filteredEnviorements = this.enviorements
      }
    });
  }
}
