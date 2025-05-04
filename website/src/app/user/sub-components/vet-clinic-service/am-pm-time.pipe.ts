import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amPmTime'
})
export class AmPmTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const [hours, minutes] = value.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minutes} ${ampm}`;
  }
}
