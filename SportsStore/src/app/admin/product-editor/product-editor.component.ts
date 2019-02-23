import { Component } from '@angular/core';
import { Product } from 'app/model/product.model';
import { ProductRepository } from 'app/model/product.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'product-editor.component.html'
})
export class ProductEditorComponent {
    private editing: boolean = false;
    private product: Product = new Product();
    
    constructor(
        private repository: ProductRepository,
        private router: Router,
        activeRoute: ActivatedRoute) {
            this.editing = activeRoute.snapshot.params['mode'] == 'edit';

            if(this.editing) {
                Object.assign(
                    this.product,
                    repository.getProduct(activeRoute.snapshot.params['id']));
            }
    }

    public save(form: NgForm): void {
        this.repository.saveProduct(this.product);
        this.router.navigateByUrl('/admin/main/products');
    }
}