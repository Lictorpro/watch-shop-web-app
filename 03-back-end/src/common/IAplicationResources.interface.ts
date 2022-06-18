import * as mysql2 from "mysql2/promise";
import CategoryService from "../components/category/CategoryService.service";
import ItemService from "../components/item/ItemService.service";
import BandTypeService from "../components/band-type/BandTypeService.service";
import AdministratorService from "../components/administrator/AdministratorService.service";
import UserService from '../components/user/UserService.service';

export interface IServices {
  category: CategoryService;
  item: ItemService;
  bandType: BandTypeService;
  administrator: AdministratorService;
  user: UserService;
}

export default interface IApplicationResources {
  databaseConnection: mysql2.Connection;
  services: IServices;
}
