import { Pipe, PipeTransform } from '@angular/core';
import { BuildingsService } from '../services/buildings.service';
import { map } from 'rxjs';

@Pipe({
  name: 'buildingName',
  pure: true
})
export class BuildingNamePipe implements PipeTransform {

  constructor(private buildingService : BuildingsService) {}

  transform(id: string) {
    console.log(id)
    return this.buildingService.getBuildingById(id).pipe(
      map(res => res.building.name)
    )
  }

}
