import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalDate',
  standalone: true,
})
export class OrdinalDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const suffix = this.getOrdinalSuffix(day);

    return `${month} ${day}${suffix}, ${year}`;
  }

  private getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
