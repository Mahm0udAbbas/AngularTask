import { Component } from '@angular/core';
import { ApiServiceService } from '../../service/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { Icategory } from '../../models/icategory';
import { FormsModule, NgForm } from '@angular/forms';
import { CatgoryService } from '../../service/catgory.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  productId: string | null = null;
  product: Iproduct = {} as Iproduct;
  catList: Icategory[] = [] as Icategory[];
  constructor(
    private activeRoute: ActivatedRoute,
    private apiServiceService: ApiServiceService,
    private router: Router,
    private catgoryService: CatgoryService
  ) {}
  ngOnInit() {
    this.productId = this.activeRoute.snapshot.paramMap.get('id');
    this.apiServiceService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
    });
  }
  EditProduct() {
    this.apiServiceService
      .EditProduct(this.product.id, this.product)
      .subscribe((data) => {
        this.router.navigate(['/home']);
        console.log(data);
      });
  }
}
