import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
  standalone: true,
})
export class CreditCardPipe implements PipeTransform {
  transform(cerditCardNumber: string, sep: string): string {
    let creditCardNum: string[] = [
      cerditCardNumber.slice(0, 4),
      cerditCardNumber.slice(4, 8),
      cerditCardNumber.slice(8, 12),
      cerditCardNumber.slice(12, 16),
    ];
    cerditCardNumber = creditCardNum.join('-');
    return cerditCardNumber;
  }
}
