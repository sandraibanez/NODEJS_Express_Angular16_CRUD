import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';

const routes: Routes = [
    { path: '', component: ProductsListComponent},
    { path: 'add', component: ProductsAddComponent},
    { path: ':slug', component: ProductsDetailsComponent},
    { path: 'update/:slug', component: ProductsAddComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }