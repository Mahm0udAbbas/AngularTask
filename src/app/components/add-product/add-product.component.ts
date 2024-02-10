import { Component } from '@angular/core';
import { Icategory } from '../../models/icategory';
import { CatgoryService } from '../../service/catgory.service';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  catList: Icategory[] = [] as Icategory[];
  product: Iproduct = {} as Iproduct;
  constructor(
    private categoryService: CatgoryService,
    private apiServiceServise: ApiServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.categoryService.getAllCateogories().subscribe((data) => {
      this.catList = data;
    });
  }
  addNewProduct() {
    this.apiServiceServise.addNewProduct(this.product).subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }
}
