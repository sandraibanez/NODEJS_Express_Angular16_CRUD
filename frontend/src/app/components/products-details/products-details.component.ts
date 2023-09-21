import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent {
  products?: Product[];
  message = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      console.log("no view")
    }
  }

  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    name: "",
    price: 0,
    description: "",
    // picture: []
  }

  deleteProduct(slug: string): void {
    this.productService.delete_product(slug).subscribe({
      next: data => {
        // console.log(data);
        this.products = data
        this.productService.products = this.productService.products.filter(p => p.slug !== this.currentProduct.slug);
        this.toastrService.success("This product has been removed")
      },//next
      error: (e) => this.toastrService.error("Can't remove this product")
    });//error
  }//deleteProduct


}
