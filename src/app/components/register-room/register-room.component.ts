import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-room',
  imports: [CommonModule],
  templateUrl: './register-room.component.html',
  styleUrl: './register-room.component.css'
})
export class RegisterRoomComponent {
  addNewEnviorement: boolean = false;
  enviorements: any[] = [];
  
  handleAddNewEnviorement(){
    this.addNewEnviorement = !this.addNewEnviorement;
  }
}
