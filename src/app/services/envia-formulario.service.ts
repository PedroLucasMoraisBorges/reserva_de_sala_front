import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviaFormularioService {

  constructor() { }

  enviaInfoBackend(data: any){
    console.log('Enviando dados para o backend:', data);
  }
}
