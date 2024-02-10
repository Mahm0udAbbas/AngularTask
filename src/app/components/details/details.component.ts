import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { ProductsService } from '../../service/products.service';
import { Location } from '@angular/common';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  productId: string | null = null;
  product: Iproduct | null = null;
  constructor(
    private activeRoute: ActivatedRoute,
    private productSer: ProductsService,
    private location: Location,
    private apiServiceService: ApiServiceService
  ) {}
  ngOnInit() {
    this.productId = this.activeRoute.snapshot.paramMap.get('id') ;

    this.apiServiceService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
    });
  }
  goBack() {
    this.location.back();
  }
}
