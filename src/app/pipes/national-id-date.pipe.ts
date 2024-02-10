import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalIdDate',
  standalone: true,
})
export class NationalIdDatePipe implements PipeTransform {
  transform(nationalId: string, format?: string): string {
    let year = nationalId.substring(1, 3);
    let month = nationalId.substring(3, 5);
    let day = nationalId.substring(5, 7);
    console.log(year, month, day);
    if (nationalId[0] == '2') {
      year = '19' + year;
    } else if (nationalId[0] == '3') {
      year = '20' + year;
    }
    switch (format) {
      case 'yy':
        nationalId = year;
        break;
      case 'mm':
        nationalId = month;
        break;
      case 'dd':
        nationalId = day;
        break;
      default:
        nationalId = `${day}\\${month}\\${year}`;
        break;
    }
    return nationalId;
  }
}
