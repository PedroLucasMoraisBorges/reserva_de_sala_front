import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDate'
})
export class DatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const formattedDate = new Date(value + "T00:00:00").toLocaleDateString("pt-BR");
    return formattedDate;
  }
}
