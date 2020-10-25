import { TransactionController } from "./controller/TransactionController";
import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users/signup",
    controller: UserController,
    action: "save"
}, {
    method: "post",
    route: "/users/authorization",
    controller: UserController,
    action: "isAdmin"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/buy-sharewon",
    controller:TransactionController ,
    action:"buy",
}, { 
    method: "post",
    route: "/sell-sharewon", 
    controller:TransactionController,
    action:"sell"
}
];