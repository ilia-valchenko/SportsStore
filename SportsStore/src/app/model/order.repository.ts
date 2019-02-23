import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded: boolean = false;

    constructor(private dataSource: RestDataSource) {}

    public loadOrders() {
        this.loaded = true;
        this.dataSource.getOrders()
            .subscribe(loadedOrders => this.orders = loadedOrders);
    }

    public getOrders(): Order[] {
        if(!this.loaded) {
            this.loadOrders();
        }

        return this.orders;
    }

    public saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }

    public updateOrder(order: Order): void {
        this.dataSource.updateOrder(order)
            .subscribe(updatedOrder => this.orders.splice(
                this.orders.findIndex(o => o.id === updatedOrder.id),
                1,
                updatedOrder
            ));
    }

    public deleteOrder(id: number): void {
        this.dataSource.deleteOrder(id)
            .subscribe(deletedOrder => this.orders.splice(
                this.orders.findIndex(o => o.id === deletedOrder.id)));
    }
}