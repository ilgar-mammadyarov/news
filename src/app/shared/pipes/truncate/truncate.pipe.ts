import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    start: number,
    end: number,
    ending: string = '...'
  ): string {
    if (!value) return '';
    return value.length > end
      ? value.substring(start, end) + ending
      : value.substring(start, end);
  }
}
