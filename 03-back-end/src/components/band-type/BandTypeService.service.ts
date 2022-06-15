import BandTypeModel from "./BandTypeModel.model";
import * as mysql2 from "mysql2/promise";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import BaseService from "../../common/BaseService";

interface IBandTypeAdapterOptions extends IAdapterOptions {
  loadItems: boolean;
}

const DefaultBandTypeAdapterOptions: IBandTypeAdapterOptions = {
  loadItems: false,
};

class BandTypeService extends BaseService<
  BandTypeModel,
  IBandTypeAdapterOptions
> {
  tableName(): string {
    return "band_type";
  }

  protected async adaptToModel(
    data: any,
    options: IBandTypeAdapterOptions = DefaultBandTypeAdapterOptions
  ): Promise<BandTypeModel> {
    const bandType: BandTypeModel = new BandTypeModel();

    bandType.bandTypeId = +data?.bandType_id; //ovde pisemo imena kolona iz tabele u bazi
    bandType.name = data?.name;

    if (options.loadItems) {
      bandType.items = await this.services.item.getAllByBandTypeId(
        bandType.bandTypeId, {
          loadCatgery: false,
          loadBandType: false,
          hideInactiveCategories: false
        }
      );
    }

    return bandType;
  }

  public async getAll(): Promise<BandTypeModel[]> {
    return new Promise<BandTypeModel[]>((resolve, reject) => {
      const sql: string = "SELECT * FROM `band_type` ORDER BY `name`;";
      this.db
        .execute(sql)
        .then(async ([rows]) => {
          if (rows === undefined) {
            resolve([]);
          }

          const bandTypes: BandTypeModel[] = [];

          for (const row of rows as mysql2.RowDataPacket[]) {
            bandTypes.push(
              await this.adaptToModel(row, {
                loadItems: true,
              })
            );
          }

          resolve(bandTypes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

 /* public async getById(Id: number): Promise<BandTypeModel> | null {
    return new Promise<BandTypeModel>((resolve, reject) => {
      const sql: string = "SELECT * FROM `band_type` WHERE _id = ?;";
      this.db
        .execute(sql, [Id])
        .then(async ([rows]) => {
          if (rows === undefined) {
            resolve(null);
          }

          if (Array.isArray(rows) && rows.length === 0) {
            return resolve(null);
          }

          resolve(
            await this.adaptToModel(rows[0], {
              loadItems: true,
            })
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  }*/
}

export default BandTypeService;
