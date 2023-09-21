import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
  update: boolean = false;

form: FormGroup = new FormGroup({
  name: new FormControl(''),
  price: new FormControl(''),
  description: new FormControl('')
  });
    submitted = false;
  constructor(
    private route: ActivatedRoute,
    private product_service: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    if (this.route.snapshot.params["slug"]) {
      this.get_product(this.route.snapshot.params["slug"]);
      this.update = true;
    }
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get_product(slug: string): void {
    this.product_service.getOne(slug).subscribe({
      next: data => {
        this.form.patchValue(data);
        console.log(this.form.value);
      },
      error: e => {
        console.error(e);
      }
    });
  }

  insert_product(): void {
    if (this.form.valid) {
      this.product_service.insert_product(this.form.value).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/product']);
        }
      });
    }
  }

  update_product(): void {
    if (this.form.valid) {
      this.product_service.update_product(this.form.value, this.route.snapshot.params["slug"]).subscribe({
        next: data => {
          this.router.navigate(['/product']);
        }
      });
    }
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }
  
}