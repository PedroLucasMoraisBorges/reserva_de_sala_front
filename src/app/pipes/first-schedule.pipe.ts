import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstSchedule'
})
export class FirstSchedulePipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): unknown {
    const firstSchedule = value
    .map((s: any) => s.entryTime)
    .sort()[0]
    .slice(0, 5);

    return firstSchedule
  }

}
