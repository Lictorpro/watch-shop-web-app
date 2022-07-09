import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import { AddItemValidator, IAddItemDto } from './dto/IAddItem.dto';
import CategoryModel from '../category/CategoryModel.model';
import ItemModel from './ItemModel.model';
import { EditItemValidator, IEditItemDto } from './dto/IEditItem.dto ';
import { DefaultItemAdapterOptions } from './ItemService.service';
export default class ItemController extends BaseController{

  async getAll(req: Request, res: Response) {
    if(req.authorisation?.role === "administrator"){
      return res.send([
        "test for " + req.authorisation?.identity
      ]);
    }

    this.services.item
      .getAll({loadBandType: true, loadCategory: false, hideInactiveCategories: false})
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

    async getAllItemsByCategoryId(req: Request, res: Response){
        const categoryId: number = +req.params?.cid;
   
        this.services.category
         .getById(categoryId, {})   
         .then((result) => {
           if (result === null) {
             return res.status(404).send("Category not found!");
           }
           
           this.services.item.getAllByCategoryId(categoryId, { loadBandType: true, loadCategory: false, hideInactiveCategories: true }).then(result =>{
             res.send(result);
           }).catch(error => {
             res.status(500).send(error?.message);
           })
         })
         .catch((error) => {
           res.status(500).send(error?.message);
         });
     }

     async add(req: Request, res: Response){ // Ovo je jako upitno braco moracemo kasnije
      const categoryId: number = +req.params?.cd;
      const data = req.body as IAddItemDto;

      if (!AddItemValidator(data)){
        return res.status(400).send(AddItemValidator.errors);
      }

      this.services.category.getById(categoryId, {}).then(result => {
        if(result === null){
          return res.status(404).send("Category not found!");
        }

        // this.services.item.getById(newItem.itemId, {
        //   loadBandType: true,
        //   loadCatgery: true
        // }).then(result => {res.send(result)}).cathc(error => {res.status(500).send(error?.message  )}) 

      })
     }

     async edit(req: Request, res: Response){
      const categoryId: number = +req.params?.cid;

      const data = req.body as IEditItemDto;

      this.services.category.getById(categoryId, {
      })
      .then(result => {
        if(result === null){
          throw{
            status: 404,
            message: "Category not found!"
          };
        }
        return result as CategoryModel;
      })
      .then(async category => {
        const itemId: number = +req.params?.iid;
        return this.retriveItem(category, itemId);
      })
      .then(this.checkItem)
      .then(async result => {
        this.services.item.startTransaction();
        return result;
      })
      .then(async result => {
        const currentCategoryIds = result.item.categories?.map(category => category.categoryId);
        //const data = req.body as IEditItemDto;
        const newCategoryIds = data.categoryIds;

        const avaibableCategoryIds = result.item.categories?.map(c => c.categoryId);

        for(let id of data.categoryIds){
          if(!avaibableCategoryIds.includes(id)){
            throw{
              status: 400,
              message: "Category " + id + "is not avaibable!"
            }
          }
        }

        const categoryIdsToAdd = newCategoryIds.filter(id => !currentCategoryIds.includes(id));
        

        for(let id of categoryIdsToAdd){
          if(!await this.services.item.addItemCategory ({
            item_id: result.item.itemId,
            category_id: id
          })){
            throw{
              status: 500,
              message: "Error adding a new category to this item! "
            }
          }
        }

        const categoryIdsToDelete = currentCategoryIds.filter( id => !newCategoryIds.includes(id));

        for(let id of categoryIdsToDelete){
          if(!await this.services.item.deleteItemCategory({
            item_id: result.item.itemId,
            category_id: id
          })){
            throw{
              status: 500,
              message: "Error deleting an existing category from this item!"
            }
          }
        }

        await this.services.item.edit(result.item.itemId, {
          name: data.name,
          description: data.description,
          image_path: data.imagePath,
          movement_type: data.movementType,
          display_type: data.displayType,
          is_active: data.isActive ? 1 : 0,
          price: data.price
        },{
          loadBandType: false,
          loadCategory: false,
          hideInactiveCategories: false
        })
        return result;
      })
      .then(async result => {
        await this.services.item.commitChanges();
        res.send(await this.services.item.getById(result.item.itemId,{
          loadBandType: false,
          loadCategory: false,
          hideInactiveCategories: false
        }));
      })
      .catch(async error => { 
        await this.services.item.rollbackChanges();
        res.status(error?.status).send(error?.message)
      })
      
     }

     private async retriveItem(category: CategoryModel, itemId: number): Promise<{ category: CategoryModel, item: ItemModel | null }>{
        return {
          category: category,
          item: await this.services.item.getById(itemId, {
          loadBandType: false,
          loadCategory: false,
          hideInactiveCategories: false
        })
      }
     }

     private checkItem(result: { category: CategoryModel, item: ItemModel | null}): {category: CategoryModel, item: ItemModel}{
      if (result.item === null){
        throw{
          status: 404,
          message: "Item not found!"
        };
      }

      // if (result.item.bandTypeId === bandTypeId){
      //   throw{
      //     status: 404,
      //     message: "Item not found!"
      //   };
      // }

      return result;
     }


}