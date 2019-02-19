import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { CartLine } from "./cart-line.model";

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;

    public addLine(product: Product, quantity: number = 1) {
        let line = this.lines.find(line => line.product.id === product.id);

        if(line != undefined) {
            line.quantity += quantity;
        }
        else 
        {
            this.lines.push(new CartLine(product, quantity));
        }

        this.recalculate();
    }

    public updateQuantity(product: Product, quantity: number) {
        let line = this.lines.find(line => line.product.id == product.id);

        if(line != undefined) {
            line.quantity = Number(quantity);
        }

        this.recalculate();
    }

    public removeLine(id: number) {
        let index = this.lines.findIndex(line => line.product.id == id);
        this.lines.splice(index);
        this.recalculate();
    }

    public clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;

        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * l.product.price);
        });
    }
}