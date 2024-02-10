import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Iproduct[];
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'camera sony',
        quantity: 3,
        price: 78000,
        imageUrl: './assets/images/sony.jpeg',
        catId: 1001,
      },
      {
        id: 2,
        name: 'HP LabTop',
        quantity: 6,
        price: 23000,
        imageUrl: './assets/images/hp.jpeg',
        catId: 1002,
      },
      {
        id: 3,
        name: 'Dell LabTop',
        quantity: 8,
        price: 23000,
        imageUrl: './assets/images/dell.jpeg',
        catId: 1002,
      },
      {
        id: 4,
        name: 'Iphone 15',
        quantity: 0,
        price: 65000,
        imageUrl: './assets/images/iphone.webp',
        catId: 1003,
      },
      {
        id: 5,
        name: 'Xiaomi',
        quantity: 10,
        price: 15000,
        imageUrl: './assets/images/xiaomi.jpeg',
        catId: 1003,
      },
      {
        id: 6,
        name: 'Cammera canon',
        quantity: 1,
        price: 100000,
        imageUrl: './assets/images/images.jpeg',
        catId: 1001,
      },
    ];
  }

  getAllProducts(): Iproduct[] {
    return this.products;
  }
  getProductById(id: number): Iproduct | null {
    let product = this.products.find((product: Iproduct) => product.id == id);
    return product ? product : null;
  }

  getProductByCatId(catId: number):Iproduct[]{
    return this.products.filter((product: Iproduct) => product.catId == catId);
  }
}
