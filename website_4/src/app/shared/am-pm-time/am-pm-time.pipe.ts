import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'amPmTime',
  standalone: true
})
export class AmPmTimePipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      const [hours, minutes] = value.split(':');
      let period = 'AM';

      let hoursNum = parseInt(hours, 10);
      if (hoursNum >= 12) {
        period = 'PM';
        if (hoursNum > 12) {
          hoursNum -= 12;
        }
      }

      return `${hoursNum}:${minutes} ${period}`;
    }

    return null;
  }

}
