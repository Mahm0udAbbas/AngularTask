import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../models/icategory';
import { CommonModule } from '@angular/common';
import { CartItems } from '../../models/cart-items';
import { CatgoryService } from '../../service/catgory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ProductComponent, FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  selectedCat: number = 1001;
  categories: Icategory[] = [] as Icategory[];
  cartElements!: CartItems[];
  totalPrice: number = 0;
  @ViewChild(ProductComponent) product!: ProductComponent;
  subscriptionCat!: Subscription ;

  constructor(private catgoryService: CatgoryService) {}
  ngOnInit() {
    this.subscriptionCat = this.catgoryService
      .getAllCateogories()
      .subscribe((data) => {
        this.categories = data;
        console.log(data);
      });
  }

  showComponent(products: CartItems[]) {
    this.cartElements = products;
    this.totalPrice = 0;
    this.cartElements.forEach((ele) => {
      this.totalPrice += ele.totalQuantity * ele.price;
    });
  }
  removeItem(id: number, price: number) {
    this.cartElements.forEach((element) => {
      if (element.id == id) {
        if (element.totalQuantity === 1) {
          this.cartElements = this.removeItemById(
            this.cartElements,
            element.id
          );
          this.totalPrice -= price;
        } else if (element.totalQuantity > 1) {
          element.totalQuantity--;
          this.totalPrice -= price;
        }
      }
    });
  }
  removeItemById(array: CartItems[], id: number) {
    return array.filter((obj) => obj.id !== id);
  }

  reduseQuant() {
    console.log(this.product.products);
    console.log(this.cartElements);

    this.product.products.forEach((product) => {
      this.cartElements.forEach((element) => {
        if (element.id == product.id) {
          if (product.quantity > 0) {
            product.quantity = product.quantity - element.totalQuantity;
          } else {
            product.quantity = 0;
          }
        }
      });
    });
  }
  ngOnDestroy() {
    this.subscriptionCat.unsubscribe();
  }
}
