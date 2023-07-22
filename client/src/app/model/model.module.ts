import { NgModule } from "@angular/core";
import { BookRepository } from "./book.repository";
import { StaticDataSource } from "./static.datasource";
import { Cart } from "./cart.model";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";
import { OrderRepository } from "./order.repository";
import { Order } from "./order.model";

@NgModule({
    imports: [HttpClientModule],
    providers: [BookRepository, StaticDataSource, Cart, Order, OrderRepository,
    {provide: StaticDataSource, useClass: RestDataSource}, RestDataSource]
})
export class ModelModule {}