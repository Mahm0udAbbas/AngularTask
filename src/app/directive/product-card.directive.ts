import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appProductCard]',
  standalone: true,
})
export class ProductCardDirective {
  @Input() inputColor: string = '#fff';
  constructor(public card: ElementRef) {
    this.card.nativeElement.style.borderRaduis = '20px';
    this.card.nativeElement.style.boxShadow =
      ' rgba(0, 0, 0, 0.35) 0px 5px 15px ';
    this.card.nativeElement.style.transition = ' 0.3s';
  }

  @HostListener('mouseover') increaseShadow() {
    this.card.nativeElement.style.boxShadow =
      ' rgba(0, 0, 0, 0.5) 0px 20px 30px ';
    this.card.nativeElement.style.backgroundColor = `${this.inputColor}`;
  }
  @HostListener('mouseout') originalShadow() {
    this.card.nativeElement.style.boxShadow =
      ' rgba(0, 0, 0, 0.35) 0px 5px 15px ';
    this.card.nativeElement.style.backgroundColor = `#fff`;
  }
}
