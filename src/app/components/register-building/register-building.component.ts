import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-building',
  imports: [CommonModule],
  templateUrl: './register-building.component.html',
  styleUrl: './register-building.component.css'
})
export class RegisterBuildingComponent {
  buildings: any[] = [];
  addNewBuilding :boolean = false;

  handleAddNewBuilding() {
    this.addNewBuilding = !this.addNewBuilding;
  }
}
