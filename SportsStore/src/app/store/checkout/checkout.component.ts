import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderRepository } from 'app/model/order.repository';
import { Order } from 'app/model/order.model';


@Component({
    moduleId: module.id,
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.scss']
})
export class CheckoutComponent {
    orderSent: boolean = false;
    submitted: boolean = false;

    constructor(
        public repository: OrderRepository,
        public order: Order
    ) {
        console.log(order);
    }

    public submitOrder(form: NgForm) {
        this.submitted = true;

        if(form.valid) {
            this.repository.saveOrder(this.order)
                .subscribe(order => {
                    this.order.clear();
                    this.orderSent = true;
                    this.submitted = false;
                });
        }
    }
}