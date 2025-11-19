import { inject, Pipe, PipeTransform } from '@angular/core';
import { EnviorementsService } from '../services/enviorements.service';
import { map } from 'rxjs';

@Pipe({
  name: 'enviorementName',
  pure: true
})
export class EnviorementPipe implements PipeTransform {

  constructor(private enviorementService: EnviorementsService) {}

  transform(id: number) {
    return this.enviorementService.getEnviorementById(id).pipe(
      map(res => res.enviorement.name)
    );
  }
}

