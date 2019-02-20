import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { StoreModule } from "./store/store.module";
import { RouterModule } from "@angular/router";
import { StoreComponent } from "./store/store.component";
import { CartDetailComponent } from "./store/cart-detail/cart-detail.component";
import { CheckoutComponent } from "./store/checkout/checkout.component";
import { StoreFirstGuard } from "./store-first.guard";

@NgModule({
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      { 
        path: 'store',
        component: StoreComponent,
        canActivate: [StoreFirstGuard]
      },
      { 
        path: 'cart',
        component: CartDetailComponent,
        canActivate: [StoreFirstGuard]
      },
      { 
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canActivate: [StoreFirstGuard]
      },
      { 
        path: '**',
        redirectTo: '/store'
      }
    ])],
  declarations: [AppComponent],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }