import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    return  date.toISOString().slice(0, 19).replace('T', ' ');
  }

}
