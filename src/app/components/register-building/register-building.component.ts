import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuildingsService } from '../../services/buildings.service';

@Component({
  selector: 'app-register-building',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-building.component.html',
  styleUrl: './register-building.component.css'
})
export class RegisterBuildingComponent {
  private buildingService = inject(BuildingsService);
  buildings: any[] = [];
  addNewBuilding :boolean = false;
  editMode: boolean = false;
  selectedBuilding: any = null;

  handleAddNewBuilding(){
    this.addNewBuilding = !this.addNewBuilding;
    this.selectedBuilding = {};
  }

  handleEditBuilding(item: any) {
    this.selectedBuilding = { ...item };
    this.editMode = true;
    this.addNewBuilding = true;
  }

  closeModal() {
    this.addNewBuilding = false;
    this.editMode = false;
    this.selectedBuilding = null;
  }

  reloadEnvs() {
    this.buildingService.getAllBuildings().subscribe({
      next: (res) => {
        this.buildings = res.buildings || [];
      }
    });
  }

  deleteBuilding(id: string) {
    this.buildingService.deleteBuilding(id).subscribe({
      next: () => {
        this.reloadEnvs();
      }
    })
  }

  saveEnviorement() {
    const payload = {
      name: this.selectedBuilding.name,
      floors: this.selectedBuilding.floors
    };

    if (this.editMode) {
      this.buildingService.updateBuilding(this.selectedBuilding.id, payload)
        .subscribe({
          next: () => {
            this.closeModal();
            this.reloadEnvs();
            // this.toastr.success('Ambiente removido com sucesso');
          },
          error: () => console.log('Erro ao atualizar ambiente')
        });
    } else {
        this.buildingService.createBuilding(payload)
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
    this.buildingService.getAllBuildings().subscribe({
      next: (res) => {
        this.buildings = res.buildings || [];
      },
      error: () => {
        console.log('Erro ao carregar os prédios');
      }
    });
  }
}
