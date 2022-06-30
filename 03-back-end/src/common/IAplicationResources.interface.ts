import * as mysql2 from "mysql2/promise";
import CategoryService from "../components/category/CategoryService.service";
import ItemService from "../components/item/ItemService.service";
import BandTypeService from "../components/band-type/BandTypeService.service";
import AdministratorService from "../components/administrator/AdministratorService.service";
import UserService from '../components/user/UserService.service';
import OrderService from '../components/cart/OrderService.service';
import CartService from '../components/cart/CartService.service';

export interface IServices {
  category: CategoryService;
  item: ItemService;
  bandType: BandTypeService;
  administrator: AdministratorService;
  user: UserService;
  cart: CartService;
  order: OrderService;
}

export default interface IApplicationResources {
  databaseConnection: mysql2.Connection;
  services: IServices;
}
