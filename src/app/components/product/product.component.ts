import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardDirective } from '../../directive/product-card.directive';
import { NationalIdDatePipe } from '../../pipes/national-id-date.pipe';
import { CreditCardPipe } from '../../pipes/credit-card.pipe';
import { CartItems } from '../../models/cart-items';
import { ProductsService } from '../../service/products.service';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardDirective,
    NationalIdDatePipe,
    CreditCardPipe,
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: Iproduct[] = [] as Iproduct[];
  filteredProducts!: Iproduct[];
  cartItems: CartItems[] = [];
  @Input() recivedSelectedCat: number = 1001;
  @Output() onBuy: EventEmitter<CartItems[]>;
  selectedItemId: number = 1001;
  subscription!: Subscription;
  constructor(
    private productService: ProductsService,
    private router: Router,
    private apiService: ApiServiceService
  ) {
    this.onBuy = new EventEmitter<CartItems[]>();
  }
  ngOnInit() {
    this.subscription = this.apiService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
  addToCart(id: number) {
    let cartItem: CartItems;
    let [ele] = this.products.filter((ele) => ele.id == id);
    cartItem = {
      id: ele.id,
      name: ele.name,
      quantity: ele.quantity,
      price: ele.price,
      imageUrl: ele.imageUrl,
      catId: ele.catId,
      totalQuantity: 1,
    };
    if (!this.containsObject(this.cartItems, cartItem)) {
      this.cartItems.push(cartItem);
      if (cartItem.quantity > 0) {
        cartItem.quantity--;
      } else {
        cartItem.quantity = 0;
      }
    } else {
      this.cartItems.forEach((item) => {
        if (item.id === cartItem.id) {
          if (item.totalQuantity == cartItem.quantity) {
            item.totalQuantity = cartItem.quantity;
            console.log(cartItem.quantity);
          } else {
            item.totalQuantity++;
          }
        }
      });
    }
    this.onBuy.emit(this.cartItems);
  }
  containsObject(array: CartItems[], obj: CartItems) {
    return array.some((item) => item.id === obj.id);
  }
  ngOnChanges() {
    // this.filteredProducts = this.productService.getProductByCatId(
    //   this.recivedSelectedCat
    // );
    this.apiService
      .getProductByCatId(this.recivedSelectedCat)
      .subscribe((data) => {
        this.filteredProducts = data;
      });
  }
  // ShowDetails(id: number) {
  //   this.router.navigate(['/details', id]);
  // }
  goToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }
  deleteProduct(id: number) {
    this.apiService
   .deleteProduct(id)
   .subscribe((data) => {
        this.filteredProducts = this.filteredProducts.filter(
          (ele) => ele.id!== id
        );
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
